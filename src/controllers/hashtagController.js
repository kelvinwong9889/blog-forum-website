const hashtagService = require('../services/hashtagService');
const postHashtagService = require('../services/postHashtagService');
const postService = require('../services/postService');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

exports.createHashtagWithPost = async (req, res, next) => {
    try {
        const { name, post_id } = req.body;
        const hashtag = await postHashtagService.addHashtagToPost(post_id, name, req.user.id);
        res.status(201).json({ hashtag });
    } catch (error) {
        if (error.message === ERROR_MESSAGES.POST_NOT_FOUND || error.message === ERROR_MESSAGES.HASHTAG_NOT_FOUND) {
            error.status = 404;
        }
        next(error);
    }
};

exports.getHashtag = async (req, res, next) => {
    try {
        const hashtag = await hashtagService.getHashtagById(req.params.id);
        res.status(200).json({ hashtag });
    } catch (error) {
        next(error);
    }
};

exports.getHashtags = async (req, res, next) => {
    try {
        const hashtags = await hashtagService.getAllHashtags();
        const hashtagsWithPostCount = await Promise.all(
            hashtags.map(async (hashtag) => {
                const postHashtags = await postHashtagService.findByHashtagId(hashtag._id);
                return { ...hashtag.toJSON(), postCount: postHashtags.length };
            })
        );
        res.status(200).json({ hashtags: hashtagsWithPostCount });
    } catch (error) {
        next(error);
    }
};

exports.createAndSearchHashtag = async (req, res, next) => {
    try {
        const { name, post_id } = req.body;
        let hashtag;
        if (post_id) {
            hashtag = await postHashtagService.addHashtagToPost(post_id, name, req.user.id);
        } else {
            hashtag = await hashtagService.createHashtag({ name });
        }
        const posts = await postService.searchPostsByTag(name);
        res.status(200).json({ hashtag, posts });
    } catch (error) {
        if (error.message === ERROR_MESSAGES.POST_NOT_FOUND) {
            error.status = 404;
        }
        next(error);
    }
};