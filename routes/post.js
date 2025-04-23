const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.post('/', postController.createPost);
router.get('/:id', postController.getPost);
router.get('/', postController.getPosts);
router.get('/tag/:tagName', postController.searchPostsByTag); // 新增

module.exports = router;