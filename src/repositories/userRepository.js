const User = require('../models/user');

class UserRepository {
    async create(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            throw new Error(`用戶創建失敗: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await User.findById(id).select('-password');
        } catch (error) {
            throw new Error(`用戶查找失敗: ${error.message}`);
        }
    }

    async findByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw new Error(`用戶查找失敗: ${error.message}`);
        }
    }

    async findAll() {
        try {
            return await User.find().select('-password');
        } catch (error) {
            throw new Error(`用戶列表獲取失敗: ${error.message}`);
        }
    }

    async update(id, userData) {
        try {
            return await User.findByIdAndUpdate(id, userData, { new: true }).select('-password');
        } catch (error) {
            throw new Error(`用戶更新失敗: ${error.message}`);
        }
    }
}

module.exports = new UserRepository();