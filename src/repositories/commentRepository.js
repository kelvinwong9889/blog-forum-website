const Comment = require('../models/comment');

class CommentRepository {
    async create(commentData) {
        try {
            const comment = new Comment(commentData);
            return await comment.save();
        } catch (error) {
            throw new Error(`評論創建失敗: ${error.message}`);
        }
    }

    async findByPostId(postId, parentCommentId = null) {
        try {
            const query = { post_id: postId };
            if (parentCommentId) {
                query.parent_comment_id = parentCommentId;
            } else {
                query.parent_comment_id = null;
            }
            return await Comment.find(query)
                .populate('user_id', 'username avatar')
                .sort({ createdAt: -1 });
        } catch (error) {
            throw new Error(`評論查找失敗: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await Comment.findById(id).populate('user_id', 'username avatar');
        } catch (error) {
            throw new Error(`評論查找失敗: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await Comment.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`評論刪除失敗: ${error.message}`);
        }
    }
}

module.exports = new CommentRepository();