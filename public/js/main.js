document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const createPostLink = document.getElementById('create-post-link');
    const managePostsLink = document.getElementById('manage-posts-link');

    // 更新導航欄
    if (token) {
        registerLink.style.display = 'none';
        loginLink.style.display = 'none';
        logoutLink.style.display = 'inline';
        createPostLink.style.display = 'inline';
        managePostsLink.style.display = 'inline';
    } else {
        createPostLink.style.display = 'none';
        managePostsLink.style.display = 'none';
    }

    // 登出功能
    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/index.html';
    });

    // 載入貼文
    const postsContainer = document.getElementById('posts');
    async function loadPosts() {
        try {
            const { posts } = await API.getPosts();
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
            <h3><a href="/post-detail.html?id=${post._id}">${post.title}</a></h3>
            <p>${post.content.substring(0, 100)}...</p>
            <div class="post-meta">
              作者: ${post.user_id.username} | 分類: ${post.category_id.name} | 創建於: ${new Date(post.createdAt).toLocaleString()}
            </div>
          `;
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            postsContainer.innerHTML = `<p class="error">載入貼文失敗: ${error.message}</p>`;
        }
    }

    loadPosts();
});