const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: ERROR_MESSAGES.TOKEN_REQUIRED });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: ERROR_MESSAGES.TOKEN_EXPIRED });
        }
        return res.status(403).json({ message: ERROR_MESSAGES.TOKEN_INVALID });
    }
};

module.exports = authenticateToken;