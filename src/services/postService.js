const PostRepository = require('../repositories/postRepository');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

class PostService {
    constructor() {
        this.postRepository = new PostRepository();
    }

    async getPosts(query) {
        const { page = 1, limit = 10, category, hashtag } = query;
        return await this.postRepository.findAll({ page, limit, category, hashtag });
    }

    async getPostById(id) {
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
        }
        return post;
    }

    async createPost(userId, postData) {
        return await this.postRepository.create({ ...postData, user_id: userId });
    }

    async updatePost(id, userId, postData) {
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
        }
        if (post.user_id.toString() !== userId) {
            throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
        }
        return await this.postRepository.update(id, postData);
    }

    async deletePost(id, userId) {
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
        }
        if (post.user_id.toString() !== userId) {
            throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
        }
        await this.postRepository.delete(id);
    }
}

module.exports = PostService;