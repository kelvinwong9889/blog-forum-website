const Like = require('../models/like');

class LikeRepository {
    async create(likeData) {
        try {
            const like = new Like(likeData);
            return await like.save();
        } catch (error) {
            throw new Error(`點讚創建失敗: ${error.message}`);
        }
    }

    async findByPostId(postId) {
        try {
            return await Like.find({ post_id: postId }).populate('user_id', 'username avatar');
        } catch (error) {
            throw new Error(`點讚查找失敗: ${error.message}`);
        }
    }

    async findByCommentId(commentId) {
        try {
            return await Like.find({ comment_id: commentId }).populate('user_id', 'username avatar');
        } catch (error) {
            throw new Error(`點讚查找失敗: ${error.message}`);
        }
    }

    async findByUserAndTarget(userId, postId, commentId) {
        try {
            const query = { user_id: userId };
            if (postId) query.post_id = postId;
            if (commentId) query.comment_id = commentId;
            return await Like.findOne(query);
        } catch (error) {
            throw new Error(`點讚查找失敗: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await Like.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`點讚刪除失敗: ${error.message}`);
        }
    }

    async countByTarget(postId, commentId) {
        try {
            const query = postId ? { post_id: postId } : { comment_id: commentId };
            return await Like.countDocuments(query);
        } catch (error) {
            throw new Error(`點讚計數失敗: ${error.message}`);
        }
    }
}

module.exports = new LikeRepository();