const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategory);
router.get('/', categoryController.getCategories); // 新增

module.exports = router;