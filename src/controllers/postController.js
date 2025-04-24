const PostService = require('../services/postService');
const { validationResult } = require('express-validator');

const postService = new PostService();

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await postService.getPosts(req.query);
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        res.json(post);
    } catch (error) {
        next(error);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const post = await postService.createPost(req.user.id, req.body);
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const post = await postService.updatePost(req.params.id, req.user.id, req.body);
        res.json(post);
    } catch (error) {
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        await postService.deletePost(req.params.id, req.user.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};