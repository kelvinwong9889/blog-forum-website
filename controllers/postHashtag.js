const mongoose = require('mongoose');
const PostTag = require('../models/postHashtag');
const Tag = require('../models/hashtag');

exports.createPostTag = async (req, res, next) => {
    try {
        const { post_id, tag_id } = req.body;
        const postTag = await PostTag.create({ post_id, tag_id });
        res.status(201).json({ postTag });
    } catch (err) {
        next(err);
    }
};

exports.deletePostTag = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { post_id, tag_id } = req.body;
        await PostTag.deleteOne({ post_id, tag_id }, { session });
        // 檢查 Tag 是否還有其他 Post 關聯
        const associatedPosts = await PostTag.countDocuments({ tag_id });
        if (associatedPosts === 0) {
            await Tag.findByIdAndDelete(tag_id, { session });
        }
        await session.commitTransaction();
        res.status(200).json({ message: 'PostTag 已刪除' });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
};