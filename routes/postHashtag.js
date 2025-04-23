const express = require('express');
const router = express.Router();
const postTagController = require('../controllers/postHashtag');

router.post('/', postTagController.createPostTag);
router.delete('/', postTagController.deletePostTag);

module.exports = router;