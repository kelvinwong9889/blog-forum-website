const Post = require('../models/post');
const Tag = require('../models/hashtag');
const PostTag = require('../models/postHashtag');

exports.createPost = async (req, res, next) => {
    try {
        const { title, content, user_id, category_id } = req.body;
        const post = await Post.create({ title, content, user_id, category_id });
        res.status(201).json({ post });
    } catch (err) {
        next(err);
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('user_id', 'username avatar')
            .populate('category_id', 'name');
        if (!post) {
            const err = new Error('帖子未找到');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ post });
    } catch (err) {
        next(err);
    }
};

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate('user_id', 'username avatar')
            .populate('category_id', 'name')
            .populate('tags', 'name');
        res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
};

exports.searchPostsByTag = async (req, res, next) => {
    try {
        const { tagName } = req.params;
        // 查找包含該標籤的帖子
        const tag = await Tag.findOne({ name: tagName });
        if (!tag) {
            return res.status(200).json({ posts: [] });
        }
        const postTags = await PostTag.find({ tag_id: tag._id }).select('post_id');
        const postIds = postTags.map(pt => pt.post_id);
        const posts = await Post.find({ _id: { $in: postIds } })
            .populate('user_id', 'username avatar')
            .populate('category_id', 'name')
            .populate('tags', 'name');
        res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
};