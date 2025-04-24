const likeRepository = require('../repositories/likeRepository');
const postRepository = require('../repositories/postRepository');
const commentRepository = require('../repositories/commentRepository');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

class LikeService {
    async toggleLike(likeData, userId) {
        if (!likeData.post_id && !likeData.comment_id) {
            throw new Error(ERROR_MESSAGES.INVALID_LIKE_TARGET);
        }
        if (likeData.post_id) {
            const post = await postRepository.findById(likeData.post_id);
            if (!post) {
                const error = new Error(ERROR_MESSAGES.POST_NOT_FOUND);
                error.status = 404;
                throw error;
            }
        } else if (likeData.comment_id) {
            const comment = await commentRepository.findById(likeData.comment_id);
            if (!comment) {
                const error = new Error(ERROR_MESSAGES.COMMENT_NOT_FOUND);
                error.status = 404;
                throw error;
            }
        }
        const existingLike = await likeRepository.findByUserAndTarget(
            userId,
            likeData.post_id,
            likeData.comment_id
        );
        if (existingLike) {
            await likeRepository.delete(existingLike._id);
            return { liked: false };
        } else {
            likeData.user_id = userId;
            const like = await likeRepository.create(likeData);
            return { liked: true, like };
        }
    }

    async getLikesByPostId(postId) {
        const post = await postRepository.findById(postId);
        if (!post) {
            const error = new Error(ERROR_MESSAGES.POST_NOT_FOUND);
            error.status = 404;
            throw error;
        }
        return await likeRepository.findByPostId(postId);
    }

    async getLikesByCommentId(commentId) {
        const comment = await commentRepository.findById(commentId);
        if (!comment) {
            const error = new Error(ERROR_MESSAGES.COMMENT_NOT_FOUND);
            error.status = 404;
            throw error;
        }
        return await likeRepository.findByCommentId(commentId);
    }

    async getLikeCount(postId, commentId) {
        if (!postId && !commentId) {
            throw new Error(ERROR_MESSAGES.INVALID_LIKE_TARGET);
        }
        return await likeRepository.countByTarget(postId, commentId);
    }
}

module.exports = new LikeService();