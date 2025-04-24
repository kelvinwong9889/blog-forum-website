const mongoose = require('mongoose');
const postHashtagRepository = require('../repositories/postHashtagRepository');
const postRepository = require('../repositories/postRepository');
const hashtagService = require('../services/hashtagService');
const hashtagRepository = require('../repositories/hashtagRepository');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

class PostHashtagService {
    async addHashtagToPost(postId, hashtagName, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const post = await postRepository.findById(postId);
            if (!post) {
                throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
            }
            if (post.user_id.toString() !== userId) {
                throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
            }
            const hashtag = await hashtagService.createHashtag({ name: hashtagName });
            const existingPostHashtag = await postHashtagRepository.findByPostId(postId);
            if (existingPostHashtag.some(ph => ph.hashtag_id._id.toString() === hashtag._id.toString())) {
                throw new Error(ERROR_MESSAGES.POST_HASHTAG_ALREADY_EXISTS);
            }
            const postHashtag = await postHashtagRepository.create({ post_id: postId, hashtag_id: hashtag._id });
            await session.commitTransaction();
            return hashtag;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async addHashtagToPostById(postId, hashtagId, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const post = await postRepository.findById(postId);
            if (!post) {
                throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
            }
            if (post.user_id.toString() !== userId) {
                throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
            }
            const hashtag = await hashtagRepository.findById(hashtagId);
            if (!hashtag) {
                throw new Error(ERROR_MESSAGES.HASHTAG_NOT_FOUND);
            }
            const existingPostHashtag = await postHashtagRepository.findByPostId(postId);
            if (existingPostHashtag.some(ph => ph.hashtag_id._id.toString() === hashtag._id.toString())) {
                throw new Error(ERROR_MESSAGES.POST_HASHTAG_ALREADY_EXISTS);
            }
            const postHashtag = await postHashtagRepository.create({ post_id: postId, hashtag_id: hashtagId });
            await session.commitTransaction();
            return postHashtag;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async getHashtagsByPostId(postId) {
        const post = await postRepository.findById(postId);
        if (!post) {
            throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
        }
        const postHashtags = await postHashtagRepository.findByPostId(postId);
        return postHashtags.map(ph => ph.hashtag_id);
    }

    async findByHashtagId(hashtagId) {
        return await postHashtagRepository.findByHashtagId(hashtagId);
    }

    async removeHashtagFromPost(postId, hashtagId, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const post = await postRepository.findById(postId);
            if (!post) {
                throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
            }
            if (post.user_id.toString() !== userId) {
                throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
            }
            const hashtag = await hashtagService.getHashtagById(hashtagId);
            if (!hashtag) {
                throw new Error(ERROR_MESSAGES.HASHTAG_NOT_FOUND);
            }
            await postHashtagRepository.delete(postId, hashtagId);
            const associatedPosts = await postHashtagRepository.findByHashtagId(hashtagId);
            if (associatedPosts.length === 0) {
                await hashtagRepository.delete(hashtagId);
            }
            await session.commitTransaction();
            return { message: '貼文標籤已刪除' };
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
}

module.exports = new PostHashtagService();