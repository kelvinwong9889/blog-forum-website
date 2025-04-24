const commentRepository = require('../repositories/commentRepository');
const postRepository = require('../repositories/postRepository');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

class CommentService {
    async createComment(commentData, userId) {
        if (!commentData.content || !commentData.post_id) {
            throw new Error(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
        }
        const post = await postRepository.findById(commentData.post_id);
        if (!post) {
            const error = new Error(ERROR_MESSAGES.POST_NOT_FOUND);
            error.status = 404;
            throw error;
        }
        if (commentData.parent_comment_id) {
            const parentComment = await commentRepository.findById(commentData.parent_comment_id);
            if (!parentComment) {
                const error = new Error(ERROR_MESSAGES.INVALID_PARENT_COMMENT);
                error.status = 404;
                throw error;
            }
        }
        commentData.user_id = userId;
        return await commentRepository.create(commentData);
    }

    async getCommentsByPostId(postId, parentCommentId = null) {
        const post = await postRepository.findById(postId);
        if (!post) {
            const error = new Error(ERROR_MESSAGES.POST_NOT_FOUND);
            error.status = 404;
            throw error;
        }
        return await commentRepository.findByPostId(postId, parentCommentId);
    }

    async deleteComment(id, userId) {
        const comment = await commentRepository.findById(id);
        if (!comment) {
            const error = new Error(ERROR_MESSAGES.COMMENT_NOT_FOUND);
            error.status = 404;
            throw error;
        }
        if (comment.user_id.toString() !== userId) {
            throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
        }
        return await commentRepository.delete(id);
    }
}

module.exports = new CommentService();