const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password, avatar } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            avatar,
        });
        res.status(201).json({ user });
    } catch (err) {
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            const err = new Error('用戶未找到');
            err.status = 404;
            throw err;
        }
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ users });
    } catch (err) {
        next(err);
    }
};