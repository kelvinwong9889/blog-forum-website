const API_BASE_URL = 'http://localhost:3000/api';

async function apiRequest(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error?.message || 'API 請求失敗');
        }
        return result;
    } catch (err) {
        throw err;
    }
}

export const createUser = (userData) => apiRequest('/users', 'POST', userData);
export const getUser = (userId) => apiRequest(`/users/${userId}`);
export const getUsers = () => apiRequest('/users');
export const createPost = (postData) => apiRequest('/posts', 'POST', postData);
export const getPost = (postId) => apiRequest(`/posts/${postId}`);
export const getPosts = () => apiRequest('/posts');
export const createComment = (commentData) => apiRequest('/comments', 'POST', commentData);
export const getCommentsByPost = (postId) => apiRequest(`/comments/post/${postId}`);
export const createCategory = (categoryData) => apiRequest('/categories', 'POST', categoryData);
export const getCategory = (categoryId) => apiRequest(`/categories/${categoryId}`);
export const getCategories = () => apiRequest('/categories');
export const createHashtagWithPost = (hashtagData) => apiRequest('/hashtags/with-post', 'POST', hashtagData);
export const getHashtag = (hashtagId) => apiRequest(`/hashtags/${hashtagId}`);
export const getHashtags = () => apiRequest('/hashtags');
export const createPostHashtag = (postHashtagData) => apiRequest('/post-hashtags', 'POST', postHashtagData);
export const deletePostHashtag = (postHashtagData) => apiRequest('/post-hashtags', 'DELETE', postHashtagData);
export const createLike = (likeData) => apiRequest('/likes', 'POST', likeData);
export const getLikesByPost = (postId) => apiRequest(`/likes/post/${postId}`);
export const createAndSearchHashtag = (hashtagData) => apiRequest('/hashtags/create-and-search', 'POST', hashtagData);