const jwt = require('jsonwebtoken');
require('dotenv').config();
const userRepository = require('../repositories/userRepository');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

class UserService {
    async register(userData) {
        if (!userData.username || !userData.email || !userData.password) {
            throw new Error(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
        }
        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error(ERROR_MESSAGES.DUPLICATE_EMAIL);
        }
        const existingUsername = await userRepository.findAll().then(users =>
            users.find(u => u.username === userData.username)
        );
        if (existingUsername) {
            throw new Error(ERROR_MESSAGES.DUPLICATE_USERNAME);
        }
        return await userRepository.create(userData);
    }

    async login(credentials) {
        if (!credentials.email || !credentials.password) {
            throw new Error(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
        }
        const user = await userRepository.findByEmail(credentials.email);
        if (!user || !(await user.comparePassword(credentials.password))) {
            const error = new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
            error.status = 401;
            throw error;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
            error.status = 404;
            throw error;
        }
        return user;
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }

    async updateProfile(userId, userData) {
        if (!userData.username && !userData.email && !userData.avatar) {
            throw new Error(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
        }
        const user = await userRepository.findById(userId);
        if (!user) {
            const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
            error.status = 404;
            throw error;
        }
        if (userData.email && userData.email !== user.email) {
            const existingUser = await userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error(ERROR_MESSAGES.DUPLICATE_EMAIL);
            }
        }
        return await userRepository.update(userId, userData);
    }
}

module.exports = new UserService();