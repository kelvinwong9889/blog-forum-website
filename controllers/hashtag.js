const Hashtag = require('../models/hashtag');
const PostHashtag = require('../models/postHashtag');
const Post = require('../models/post');
const mongoose = require('mongoose');

exports.createHashtagWithPost = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, post_id } = req.body;
        const hashtag = await Hashtag.create([{ name }], { session });
        await PostHashtag.create([{ post_id, hashtag_id: hashtag[0]._id }], { session });
        await session.commitTransaction();
        res.status(201).json({ hashtag: hashtag[0] });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
};

exports.getHashtag = async (req, res, next) => {
    try {
        const hashtag = await Hashtag.findById(req.params.id);
        if (!hashtag) {
            const err = new Error('標籤未找到');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ hashtag });
    } catch (err) {
        next(err);
    }
};

exports.getHashtags = async (req, res, next) => {
    try {
        const hashtags = await Hashtag.find().populate('posts', '_id');
        res.status(200).json({ hashtags });
    } catch (err) {
        next(err);
    }
};

exports.createAndSearchHashtag = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, post_id } = req.body;

        // 查找或創建標籤
        let hashtag = await Hashtag.findOne({ name }).session(session);
        if (!hashtag) {
            hashtag = await Hashtag.create([{ name }], { session })[0];
        }

        // 如果提供了 post_id，創建 PostHashtag 關聯
        if (post_id) {
            const existingPostHashtag = await PostHashtag.findOne({ post_id, hashtag_id: hashtag._id }).session(session);
            if (!existingPostHashtag) {
                await PostHashtag.create([{ post_id, hashtag_id: hashtag._id }], { session });
            }
        }

        // 查找包含該標籤的帖子
        const postHashtags = await PostHashtag.find({ hashtag_id: hashtag._id }).select('post_id').session(session);
        const postIds = postHashtags.map(ph => ph.post_id);
        const posts = await Post.find({ _id: { $in: postIds } })
            .populate('user_id', 'username avatar')
            .populate('category_id', 'name')
            .session(session);

        await session.commitTransaction();
        res.status(200).json({ posts });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
};