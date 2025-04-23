const Like = require('../models/like');

exports.createLike = async (req, res, next) => {
    try {
        const { user_id, post_id, comment_id } = req.body;
        const like = await Like.create({ user_id, post_id, comment_id });
        res.status(201).json({ like });
    } catch (err) {
        next(err);
    }
};

exports.getLikesByPost = async (req, res, next) => {
    try {
        const likes = await Like.find({ post_id: req.params.postId })
            .populate('user_id', 'username avatar');
        res.status(200).json({ likes });
    } catch (err) {
        next(err);
    }
};