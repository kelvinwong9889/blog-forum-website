const categoryRepository = require('../repositories/categoryRepository');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

class CategoryService {
    async createCategory(categoryData) {
        if (!categoryData.name) {
            throw new Error(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
        }
        const existingCategory = await categoryRepository.findAll().then(categories =>
            categories.find(c => c.name === categoryData.name)
        );
        if (existingCategory) {
            throw new Error(ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS);
        }
        return await categoryRepository.create(categoryData);
    }

    async getCategoryById(id) {
        const category = await categoryRepository.findById(id);
        if (!category) {
            const error = new Error(ERROR_MESSAGES.CATEGORY_NOT_FOUND);
            error.status = 404;
            throw error;
        }
        return category;
    }

    async getAllCategories() {
        return await categoryRepository.findAll();
    }

    async deleteCategory(id) {
        const category = await categoryRepository.findById(id);
        if (!category) {
            const error = new Error(ERROR_MESSAGES.CATEGORY_NOT_FOUND);
            error.status = 404;
            throw error;
        }
        return await categoryRepository.delete(id);
    }
}

module.exports = new CategoryService();