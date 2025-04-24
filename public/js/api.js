const API = {
    async request(method, endpoint, data = null, token = null) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const options = {
            method,
            headers,
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        const response = await fetch(`/api${endpoint}`, options);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || '請求失敗');
        }
        return result;
    },

    async register(data) {
        return await this.request('POST', '/users/register', data);
    },

    async login(data) {
        return await this.request('POST', '/users/login', data);
    },

    async getPosts(query = {}) {
        const queryString = new URLSearchParams(query).toString();
        return await this.request('GET', `/posts${queryString ? `?${queryString}` : ''}`);
    },

    async getPost(id) {
        return await this.request('GET', `/posts/${id}`);
    },

    async createPost(data) {
        return await this.request('POST', '/posts', data, localStorage.getItem('token'));
    },

    async updatePost(id, data) {
        return await this.request('PUT', `/posts/${id}`, data, localStorage.getItem('token'));
    },

    async deletePost(id) {
        return await this.request('DELETE', `/posts/${id}`, null, localStorage.getItem('token'));
    },

    async toggleLike(data) {
        return await this.request('POST', '/likes', data, localStorage.getItem('token'));
    },

    async getLikesByPost(postId) {
        return await this.request('GET', `/likes/post/${postId}`);
    },

    async getLikesByComment(commentId) {
        return await this.request('GET', `/likes/comment/${commentId}`);
    },

    async createComment(data) {
        return await this.request('POST', '/comments', data, localStorage.getItem('token'));
    },

    async getCommentsByPost(postId) {
        return await this.request('GET', `/comments/post/${postId}`);
    },

    async deleteComment(id) {
        return await this.request('DELETE', `/comments/${id}`, null, localStorage.getItem('token'));
    },

    async getCategories() {
        return await this.request('GET', '/categories');
    },
};

export default API;