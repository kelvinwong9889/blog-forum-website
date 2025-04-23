const express = require('express');
const router = express.Router();
const hashtagController = require('../controllers/hashtag');

router.post('/with-post', hashtagController.createHashtagWithPost);
router.get('/:id', hashtagController.getHashtag);
router.get('/', hashtagController.getHashtags);
router.post('/create-and-search', hashtagController.createAndSearchHashtag);

module.exports = router;