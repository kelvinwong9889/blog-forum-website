const { ERROR_MESSAGES } = require('../constants/errorMessages');

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
    res.status(status).json({ error: message });
};