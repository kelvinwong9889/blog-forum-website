const userService = require('../services/userService');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

exports.register = async (req, res, next) => {
    try {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        };
        const user = await userService.register(userData);
        res.status(201).json({ user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar } });
    } catch (error) {
        if (error.message === ERROR_MESSAGES.DUPLICATE_EMAIL || error.message === ERROR_MESSAGES.DUPLICATE_USERNAME) {
            error.status = 400;
        }
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
        };
        const { token } = await userService.login(credentials);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar,
        };
        const user = await userService.updateProfile(req.user.id, userData);
        res.status(200).json({ user });
    } catch (error) {
        if (error.message === ERROR_MESSAGES.DUPLICATE_EMAIL || error.message === ERROR_MESSAGES.DUPLICATE_USERNAME) {
            error.status = 400;
        }
        next(error);
    }
};