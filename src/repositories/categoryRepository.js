const Category = require('../models/category');

class CategoryRepository {
    async create(categoryData) {
        try {
            const category = new Category(categoryData);
            return await category.save();
        } catch (error) {
            throw new Error(`分類創建失敗: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await Category.findById(id);
        } catch (error) {
            throw new Error(`分類查找失敗: ${error.message}`);
        }
    }

    async findAll() {
        try {
            return await Category.find();
        } catch (error) {
            throw new Error(`分類列表獲取失敗: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await Category.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`分類刪除失敗: ${error.message}`);
        }
    }
}

module.exports = new CategoryRepository();