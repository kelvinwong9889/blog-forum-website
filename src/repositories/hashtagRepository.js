const Hashtag = require('../models/hashtag');

class HashtagRepository {
    async create(hashtagData) {
        try {
            const hashtag = new Hashtag(hashtagData);
            return await hashtag.save();
        } catch (error) {
            throw new Error(`標籤創建失敗: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await Hashtag.findById(id);
        } catch (error) {
            throw new Error(`標籤查找失敗: ${error.message}`);
        }
    }

    async findByName(name) {
        try {
            return await Hashtag.findOne({ name });
        } catch (error) {
            throw new Error(`標籤查找失敗: ${error.message}`);
        }
    }

    async findAll() {
        try {
            return await Hashtag.find();
        } catch (error) {
            throw new Error(`標籤列表獲取失敗: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await Hashtag.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`標籤刪除失敗: ${error.message}`);
        }
    }
}

module.exports = new HashtagRepository();