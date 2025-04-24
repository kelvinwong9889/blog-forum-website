document.addEventListener('DOMContentLoaded', async () => {
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

    // 獲取貼文 ID
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (!postId) {
        document.getElementById('post-detail').innerHTML = '<p class="error">無效的貼文 ID</p>';
        return;
    }

    // 載入貼文詳情
    const postDetail = document.getElementById('post-detail');
    async function loadPost() {
        try {
            const { post, hashtags } = await API.getPost(postId);
            postDetail.innerHTML = `
          <div class="post">
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <div class="post-meta">
              作者: ${post.user_id.username} | 分類: ${post.category_id.name} | 創建於: ${new Date(post.createdAt).toLocaleString()}
              <br>標籤: ${hashtags.map(h => h.name).join(', ') || '無'}
            </div>
          </div>
        `;
        } catch (error) {
            postDetail.innerHTML = `<p class="error">載入貼文失敗: ${error.message}</p>`;
        }
    }

    // 載入按讚狀態
    const likeButton = document.getElementById('like-button');
    const likeCount = document.getElementById('like-count');
    async function loadLikes() {
        try {
            const { likes, likeCount: count } = await API.getLikesByPost(postId);
            likeCount.textContent = count;
            const userLike = likes.find(like => like.user_id._id === localStorage.getItem('userId')); // 假設後端返回 userId
            likeButton.textContent = userLike ? '取消按讚' : '按讚';
        } catch (error) {
            likeCount.textContent = '錯誤';
        }
    }

    // 處理按讚
    likeButton.addEventListener('click', async () => {
        if (!token) {
            alert('請先登入！');
            window.location.href = '/login.html';
            return;
        }
        try {
            const result = await API.toggleLike({ post_id: postId });
            likeButton.textContent = result.liked ? '取消按讚' : '按讚';
            loadLikes();
        } catch (error) {
            alert('按讚失敗: ' + error.message);
        }
    });

    // 載入留言
    const commentsContainer = document.getElementById('comments');
    async function loadComments() {
        try {
            const { comments } = await API.getCommentsByPost(postId);
            commentsContainer.innerHTML = '';
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = `comment ${comment.parent_comment_id ? 'reply' : ''}`;
                commentElement.innerHTML = `
            <p>${comment.content}</p>
            <div class="post-meta">
              作者: ${comment.user_id.username} | 創建於: ${new Date(comment.createdAt).toLocaleString()}
              <button class="reply-button" data-comment-id="${comment._id}">回覆</button>
              <button class="like-comment-button" data-comment-id="${comment._id}">按讚</button>
              <span class="comment-like-count" data-comment-id="${comment._id}">0</span>
            </div>
          `;
                commentsContainer.appendChild(commentElement);
            });

            // 為每個留言載入按讚數
            document.querySelectorAll('.like-comment-button').forEach(button => {
                const commentId = button.dataset.commentId;
                API.getLikesByComment(commentId).then(({ likeCount }) => {
                    document.querySelector(`.comment-like-count[data-comment-id="${commentId}"]`).textContent = likeCount;
                });
            });

            // 處理回覆按鈕
            document.querySelectorAll('.reply-button').forEach(button => {
                button.addEventListener('click', () => {
                    const commentId = button.dataset.commentId;
                    const replyForm = document.createElement('form');
                    replyForm.className = 'reply-form';
                    replyForm.innerHTML = `
              <textarea required></textarea>
              <button type="submit">提交回覆</button>
              <button type="button" class="cancel-reply">取消</button>
            `;
                    button.parentElement.appendChild(replyForm);
                    replyForm.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        if (!token) {
                            alert('請先登入！');
                            window.location.href = '/login.html';
                            return;
                        }
                        const content = replyForm.querySelector('textarea').value;
                        try {
                            await API.createComment({ content, post_id: postId, parent_comment_id: commentId });
                            replyForm.remove();
                            loadComments();
                        } catch (error) {
                            alert('回覆失敗: ' + error.message);
                        }
                    });
                    replyForm.querySelector('.cancel-reply').addEventListener('click', () => replyForm.remove());
                });
            });

            // 處理留言按讚
            document.querySelectorAll('.like-comment-button').forEach(button => {
                button.addEventListener('click', async () => {
                    if (!token) {
                        alert('請先登入！');
                        window.location.href = '/login.html';
                        return;
                    }
                    const commentId = button.dataset.commentId;
                    try {
                        await API.toggleLike({ comment_id: commentId });
                        const { likeCount } = await API.getLikesByComment(commentId);
                        document.querySelector(`.comment-like-count[data-comment-id="${commentId}"]`).textContent = likeCount;
                        button.textContent = button.textContent === '按讚' ? '取消按讚' : '按讚';
                    } catch (error) {
                        alert('按讚失敗: ' + error.message);
                    }
                });
            });
        } catch (error) {
            commentsContainer.innerHTML = `<p class="error">載入留言失敗: ${error.message}</p>`;
        }
    }

    // 處理新留言
    document.getElementById('comment-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!token) {
            alert('請先登入！');
            window.location.href = '/login.html';
            return;
        }
        const content = document.getElementById('comment-content').value;
        try {
            await API.createComment({ content, post_id: postId });
            document.getElementById('comment-content').value = '';
            loadComments();
        } catch (error) {
            alert('留言失敗: ' + error.message);
        }
    });

    // 初始化
    loadPost();
    loadLikes();
    loadComments();
});