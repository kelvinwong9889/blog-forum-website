const Post = require('../models/post');

class PostRepository {
    async create(postData) {
        try {
            const post = new Post(postData);
            return await post.save();
        } catch (error) {
            throw new Error(`貼文創建失敗: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await Post.findById(id).populate('user_id', 'username avatar').populate('category_id', 'name');
        } catch (error) {
            throw new Error(`貼文查找失敗: ${error.message}`);
        }
    }

    async findAll({ page = 1, limit = 10, categoryId, sort = '-createdAt' }) {
        try {
            const query = categoryId ? { category_id: categoryId } : {};
            return await Post.find(query)
                .populate('user_id', 'username avatar')
                .populate('category_id', 'name')
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit);
        } catch (error) {
            throw new Error(`貼文列表獲取失敗: ${error.message}`);
        }
    }

    async findByTagId(tagId) {
        try {
            const postHashtags = await require('../models/postHashtag').find({ hashtag_id: tagId }).select('post_id');
            const postIds = postHashtags.map(ph => ph.post_id);
            return await Post.find({ _id: { $in: postIds } })
                .populate('user_id', 'username avatar')
                .populate('category_id', 'name');
        } catch (error) {
            throw new Error(`按標籤查找貼文失敗: ${error.message}`);
        }
    }

    async update(id, postData) {
        try {
            return await Post.findByIdAndUpdate(id, postData, { new: true })
                .populate('user_id', 'username avatar')
                .populate('category_id', 'name');
        } catch (error) {
            throw new Error(`貼文更新失敗: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await Post.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`貼文刪除失敗: ${error.message}`);
        }
    }
}

module.exports = PostRepository;