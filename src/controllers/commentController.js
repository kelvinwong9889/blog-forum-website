const commentService = require('../services/commentService');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

exports.createComment = async (req, res, next) => {
    try {
        const commentData = {
            content: req.body.content,
            post_id: req.body.post_id,
            parent_comment_id: req.body.parent_comment_id,
        };
        const comment = await commentService.createComment(commentData, req.user.id);
        res.status(201).json({ comment });
    } catch (error) {
        if (error.message === ERROR_MESSAGES.POST_NOT_FOUND || error.message === ERROR_MESSAGES.INVALID_PARENT_COMMENT) {
            error.status = 404;
        }
        next(error);
    }
};

exports.getCommentsByPost = async (req, res, next) => {
    try {
        const comments = await commentService.getCommentsByPostId(req.params.postId);
        res.status(200).json({ comments });
    } catch (error) {
        next(error);
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        await commentService.deleteComment(req.params.id, req.user.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};