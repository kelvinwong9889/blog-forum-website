const postHashtagService = require('../services/postHashtagService');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

exports.createPostTag = async (req, res, next) => {
    try {
        const { post_id, hashtag_id } = req.body;
        const postTag = await postHashtagService.addHashtagToPostById(post_id, hashtag_id, req.user.id);
        res.status(201).json({ postTag });
    } catch (error) {
        if (error.message === ERROR_MESSAGES.POST_NOT_FOUND || error.message === ERROR_MESSAGES.HASHTAG_NOT_FOUND) {
            error.status = 404;
        }
        next(error);
    }
};

exports.deletePostTag = async (req, res, next) => {
    try {
        const { postId, hashtagId } = req.params;
        await postHashtagService.removeHashtagFromPost(postId, hashtagId, req.user.id);
        res.status(200).json({ message: '貼文標籤已刪除' });
    } catch (error) {
        if (error.message === ERROR_MESSAGES.POST_NOT_FOUND || error.message === ERROR_MESSAGES.HASHTAG_NOT_FOUND) {
            error.status = 404;
        }
        next(error);
    }
};