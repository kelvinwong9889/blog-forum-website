const express = require('express');
const router = express.Router();
const hashtagController = require('../controllers/hashtagController');
const authMiddleware = require('../middleware/auth');

router.post('/with-post', authMiddleware, hashtagController.createHashtagWithPost);
router.get('/:id', hashtagController.getHashtag);
router.get('/', hashtagController.getHashtags);
router.post('/search', authMiddleware, hashtagController.createAndSearchHashtag);

module.exports = router;