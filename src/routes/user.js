const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', authMiddleware, userController.getUser);
router.get('/', authMiddleware, userController.getUsers);
router.put('/profile', authMiddleware, userController.updateProfile);

module.exports = router;