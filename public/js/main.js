import * as api from './api.js';

// 提取帖子內容中的標籤
function extractHashtags(content) {
    const hashtagRegex = /#[\w\u4e00-\u9fa5]+/g;
    const matches = content.match(hashtagRegex) || [];
    return matches.map(hashtag => hashtag.replace(/^#/, ''));
}

document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;

    if (page === 'index') {
        loadUsers();
        loadCategories();
        loadPosts();
        loadHashtags();
    } else if (page === 'create-user') {
        setupCreateUserForm();
    } else if (page === 'create-post') {
        setupCreatePostForm();
    } else if (page === 'create-tag') {
        setupCreateHashtagForm();
    } else if (page === 'create-category') {
        setupCreateCategoryForm();
    }
});

async function loadUsers() {
    try {
        const { users } = await api.getUsers();
        const userContainer = document.getElementById('users');
        userContainer.innerHTML = users.map(user => `
      <tr>
        <td>${user._id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td><img src="${user.avatar}" alt="頭像" style="width: 50px;"></td>
      </tr>
    `).join('');
    } catch (err) {
        showError('無法加載用戶: ' + err.message);
    }
}

async function loadCategories() {
    try {
        const { categories } = await api.getCategories();
        const categoryContainer = document.getElementById('categories');
        categoryContainer.innerHTML = categories.map(category => `
      <tr>
        <td>${category._id}</td>
        <td>${category.name}</td>
      </tr>
    `).join('');
    } catch (err) {
        showError('無法加載類別: ' + err.message);
    }
}

async function loadPosts() {
    try {
        const { posts } = await api.getPosts();
        const postContainer = document.getElementById('posts');
        postContainer.innerHTML = posts.map(post => {
            const hashtags = extractHashtags(post.content);
            return `
        <tr>
          <td>${post._id}</td>
          <td>${post.title}</td>
          <td>${post.content.substring(0, 50)}${post.content.length > 50 ? '...' : ''}</td>
          <td>${post.user_id.username}</td>
          <td>${post.category_id.name}</td>
          <td>${hashtags.map(hashtag => `<a href="#" class="hashtag-link" data-hashtag="${hashtag}" data-post-id="${post._id}">[#${hashtag}]</a>`).join(' ')}</td>
          <td>${post.likes?.length || 0}</td>
        </tr>
      `;
        }).join('');

        document.querySelectorAll('.hashtag-link').forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const hashtagName = e.target.dataset.hashtag;
                const postId = e.target.dataset.postId;
                await createAndSearchHashtag(hashtagName, postId);
            });
        });
    } catch (err) {
        showError('無法加載帖子: ' + err.message);
    }
}

async function loadHashtags() {
    try {
        const { hashtags } = await api.getHashtags();
        const hashtagContainer = document.getElementById('tags');
        hashtagContainer.innerHTML = hashtags.map(hashtag => `
      <tr>
        <td>${hashtag._id}</td>
        <td><a href="#" class="hashtag-link" data-hashtag="${hashtag.name}">[#${hashtag.name}]</a></td>
        <td>${hashtag.posts.map(post => post._id).join(', ')}</td>
      </tr>
    `).join('');

        document.querySelectorAll('.hashtag-link').forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const hashtagName = e.target.dataset.hashtag;
                await createAndSearchHashtag(hashtagName);
            });
        });
    } catch (err) {
        showError('無法加載標籤: ' + err.message);
    }
}

async function createAndSearchHashtag(hashtagName, postId = null) {
    try {
        const { posts } = await api.createAndSearchHashtag({ name: hashtagName, post_id: postId });
        const searchContainer = document.getElementById('search-results');
        if (posts.length === 0) {
            searchContainer.innerHTML = `
        <div class="no-results">
          找不到關於 [#${hashtagName}] 的選項
        </div>
      `;
        } else {
            searchContainer.innerHTML = `
        <h3>標籤 [#${hashtagName}] 的搜尋結果</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>標題</th>
              <th>內容</th>
              <th>作者</th>
              <th>類別</th>
              <th>標籤</th>
              <th>點贊數</th>
            </tr>
          </thead>
          <tbody>
            ${posts.map(post => {
                const hashtags = extractHashtags(post.content);
                return `
                <tr>
                  <td>${post._id}</td>
                  <td>${post.title}</td>
                  <td>${post.content.substring(0, 50)}${post.content.length > 50 ? '...' : ''}</td>
                  <td>${post.user_id.username}</td>
                  <td>${post.category_id.name}</td>
                  <td>${hashtags.map(hashtag => `<a href="#" class="hashtag-link" data-hashtag="${hashtag}" data-post-id="${post._id}">[#${hashtag}]</a>`).join(' ')}</td>
                  <td>${post.likes?.length || 0}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      `;

            searchContainer.querySelectorAll('.hashtag-link').forEach(link => {
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const newHashtagName = e.target.dataset.hashtag;
                    const newPostId = e.target.dataset.postId;
                    await createAndSearchHashtag(newHashtagName, newPostId);
                });
            });
        }
    } catch (err) {
        showError('操作失敗: ' + err.message);
    }
}

function setupCreateUserForm() {
    const form = document.getElementById('create-user-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            avatar: formData.get('avatar') || undefined,
        };
        try {
            await api.createUser(userData);
            showSuccess('用戶創建成功！');
            form.reset();
        } catch (err) {
            showError('創建用戶失敗: ' + err.message);
        }
    });
}

function setupCreatePostForm() {
    const form = document.getElementById('create-post-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const postData = {
            title: formData.get('title'),
            content: formData.get('content'),
            user_id: formData.get('user_id'),
            category_id: formData.get('category_id'),
        };
        try {
            await api.createPost(postData);
            showSuccess('帖子創建成功！');
            form.reset();
        } catch (err) {
            showError('創建帖子失敗: ' + err.message);
        }
    });
}

function setupCreateHashtagForm() {
    const form = document.getElementById('create-hashtag-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const hashtagData = {
            name: formData.get('name'),
            post_id: formData.get('post_id'),
        };
        try {
            await api.createHashtagWithPost(hashtagData);
            showSuccess('標籤創建並關聯成功！');
            form.reset();
        } catch (err) {
            showError('創建標籤失敗: ' + err.message);
        }
    });
}

function setupCreateCategoryForm() {
    const form = document.getElementById('create-category-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const categoryData = {
            name: formData.get('name'),
        };
        try {
            await api.createCategory(categoryData);
            showSuccess('類別創建成功！');
            form.reset();
        } catch (err) {
            showError('創建類別失敗: ' + err.message);
        }
    });
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    document.body.prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = message;
    document.body.prepend(successDiv);
    setTimeout(() => successDiv.remove(), 5000);
}