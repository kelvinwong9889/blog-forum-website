const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, commentController.createComment);
router.get('/post/:postId', commentController.getCommentsByPost);
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;