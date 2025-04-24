const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const postRoutes = require('./post');
const commentRoutes = require('./comment');
const categoryRoutes = require('./category');
const hashtagRoutes = require('./hashtag');
const postHashtagRoutes = require('./postHashtag');
const likeRoutes = require('./like');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/categories', categoryRoutes);
router.use('/hashtags', hashtagRoutes);
router.use('/post-hashtags', postHashtagRoutes);
router.use('/likes', likeRoutes);

module.exports = router;