const Comment = require('../models/comment');

exports.createComment = async (req, res, next) => {
    try {
        const { content, user_id, post_id, parent_comment_id } = req.body;
        const comment = await Comment.create({ content, user_id, post_id, parent_comment_id });
        res.status(201).json({ comment });
    } catch (err) {
        next(err);
    }
};

exports.getCommentsByPost = async (req, res, next) => {
    try {
        const comments = await Comment.find({ post_id: req.params.postId })
            .populate('user_id', 'username avatar')
            .sort({ createdAt: -1 });
        res.status(200).json({ comments });
    } catch (err) {
        next(err);
    }
};