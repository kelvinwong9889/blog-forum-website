const Category = require('../models/category');

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        res.status(201).json({ category });
    } catch (err) {
        next(err);
    }
};

exports.getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            const err = new Error('分類未找到');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ category });
    } catch (err) {
        next(err);
    }
};

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (err) {
        next(err);
    }
};