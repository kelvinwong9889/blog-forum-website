const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        const error = new Error(ERROR_MESSAGES.INVALID_TOKEN);
        error.status = 401;
        return next(error);
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        const err = new Error(ERROR_MESSAGES.INVALID_TOKEN);
        err.status = 401;
        next(err);
    }
};