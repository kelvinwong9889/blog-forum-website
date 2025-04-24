const PostHashtag = require('../models/postHashtag');

class PostHashtagRepository {
    async create(postHashtagData) {
        try {
            const postHashtag = new PostHashtag(postHashtagData);
            return await postHashtag.save();
        } catch (error) {
            throw new Error(`貼文標籤創建失敗: ${error.message}`);
        }
    }

    async findByPostId(postId) {
        try {
            return await PostHashtag.find({ post_id: postId }).populate('hashtag_id');
        } catch (error) {
            throw new Error(`貼文標籤查找失敗: ${error.message}`);
        }
    }

    async findByHashtagId(hashtagId) {
        try {
            return await PostHashtag.find({ hashtag_id: hashtagId }).populate('post_id');
        } catch (error) {
            throw new Error(`標籤貼文查找失敗: ${error.message}`);
        }
    }

    async delete(postId, hashtagId) {
        try {
            return await PostHashtag.findOneAndDelete({ post_id: postId, hashtag_id: hashtagId });
        } catch (error) {
            throw new Error(`貼文標籤刪除失敗: ${error.message}`);
        }
    }

    async findAll() {
        try {
            return await PostHashtag.find();
        } catch (error) {
            throw new Error(`貼文標籤列表獲取失敗: ${error.message}`);
        }
    }
}

module.exports = new PostHashtagRepository();