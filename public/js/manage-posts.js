document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    // 檢查是否登入
    if (!token) {
        alert('請先登入！');
        window.location.href = '/login.html';
        return;
    }

    // 更新導航欄
    registerLink.style.display = 'none';
    loginLink.style.display = 'none';
    logoutLink.style.display = 'inline';

    // 登出功能
    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/index.html';
    });

    // 載入用戶貼文
    const postsContainer = document.getElementById('posts');
    async function loadPosts() {
        try {
            const { posts } = await API.getPosts();
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                if (post.user_id._id === localStorage.getItem('userId')) { // 假設後端返回 userId
                    const postElement = document.createElement('div');
                    postElement.className = 'post';
                    postElement.innerHTML = `
              <input type="checkbox" class="post-checkbox" data-id="${post._id}">
              <h3>${post.title}</h3>
              <p>${post.content.substring(0, 100)}...</p>
              <div class="post-meta">
                分類: ${post.category_id.name} | 創建於: ${new Date(post.createdAt).toLocaleString()}
                <button class="edit-button" data-id="${post._id}">編輯</button>
                <button class="delete-button" data-id="${post._id}">刪除</button>
              </div>
            `;
                    postsContainer.appendChild(postElement);
                }
            });

            // 處理編輯按鈕
            document.querySelectorAll('.edit-button').forEach(button => {
                button.addEventListener('click', () => {
                    const postId = button.dataset.id;
                    window.location.href = `/create-post.html?id=${postId}`;
                });
            });

            // 處理單一刪除
            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', async () => {
                    if (confirm('確定要刪除此貼文嗎？')) {
                        try {
                            await API.deletePost(button.dataset.id);
                            loadPosts();
                        } catch (error) {
                            alert('刪除失敗: ' + error.message);
                        }
                    }
                });
            });
        } catch (error) {
            postsContainer.innerHTML = `<p class="error">載入貼文失敗: ${error.message}</p>`;
        }
    }

    // 處理批量刪除
    document.getElementById('delete-selected').addEventListener('click', async () => {
        const selectedPosts = document.querySelectorAll('.post-checkbox:checked');
        if (selectedPosts.length === 0) {
            alert('請選擇要刪除的貼文！');
            return;
        }
        if (confirm(`確定要刪除 ${selectedPosts.length} 篇貼文嗎？`)) {
            try {
                for (const checkbox of selectedPosts) {
                    await API.deletePost(checkbox.dataset.id);
                }
                loadPosts();
                alert('批量刪除成功！');
            } catch (error) {
                alert('批量刪除失敗: ' + error.message);
            }
        }
    });

    // 初始化
    loadPosts();
});