const express = require('express');
const router = express.Router();
const postHashtagController = require('../controllers/postHashtagController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, postHashtagController.createPostTag);
router.delete('/:postId/:hashtagId', authMiddleware, postHashtagController.deletePostTag);

module.exports = router;