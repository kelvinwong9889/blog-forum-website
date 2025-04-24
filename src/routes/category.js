const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, categoryController.createCategory);
router.get('/:id', categoryController.getCategory);
router.get('/', categoryController.getCategories);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;