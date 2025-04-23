const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const postRoutes = require('./post');
const commentRoutes = require('./comment');
const categoryRoutes = require('./category');
const tagRoutes = require('./tag');
const postTagRoutes = require('./postTag');
const likeRoutes = require('./like');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/categories', categoryRoutes);
router.use('/tags', tagRoutes);
router.use('/post-tags', postTagRoutes);
router.use('/likes', likeRoutes);

module.exports = router;