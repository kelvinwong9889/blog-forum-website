const likeService = require('../services/likeService');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

exports.toggleLike = async (req, res, next) => {
    try {
        const likeData = {
            post_id: req.body.post_id,
            comment_id: req.body.comment_id,
        };
        const result = await likeService.toggleLike(likeData, req.user.id);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === ERROR_MESSAGES.POST_NOT_FOUND || error.message === ERROR_MESSAGES.COMMENT_NOT_FOUND) {
            error.status = 404;
        }
        next(error);
    }
};

exports.getLikesByPost = async (req, res, next) => {
    try {
        const likes = await likeService.getLikesByPostId(req.params.postId);
        const likeCount = await likeService.getLikeCount(req.params.postId, null);
        res.status(200).json({ likes, likeCount });
    } catch (error) {
        next(error);
    }
};

exports.getLikesByComment = async (req, res, next) => {
    try {
        const likes = await likeService.getLikesByCommentId(req.params.commentId);
        const likeCount = await likeService.getLikeCount(null, req.params.commentId);
        res.status(200).json({ likes, likeCount });
    } catch (error) {
        next(error);
    }
};