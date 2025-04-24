const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, likeController.toggleLike);
router.get('/post/:postId', likeController.getLikesByPost);
router.get('/comment/:commentId', likeController.getLikesByComment);

module.exports = router;