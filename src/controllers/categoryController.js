const categoryService = require('../services/categoryService');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

exports.createCategory = async (req, res, next) => {
    try {
        const categoryData = { name: req.body.name };
        const category = await categoryService.createCategory(categoryData);
        res.status(201).json({ category });
    } catch (error) {
        if (error.message === ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS) {
            error.status = 400;
        }
        next(error);
    }
};

exports.getCategory = async (req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.status(200).json({ category });
    } catch (error) {
        next(error);
    }
};

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({ categories });
    } catch (error) {
        next(error);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};