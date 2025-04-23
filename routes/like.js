const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like');

router.post('/', likeController.createLike);
router.get('/post/:postId', likeController.getLikesByPost);

module.exports = router;