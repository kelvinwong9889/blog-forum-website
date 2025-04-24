const { ERROR_MESSAGES } = require('../constants/errorMessages');

class Validator {
    static validateRequiredFields(data, requiredFields) {
        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            throw new Error(`${ERROR_MESSAGES.MISSING_REQUIRED_FIELDS}: ${missingFields.join(', ')}`);
        }
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            throw new Error('無效的郵箱格式');
        }
    }
}

module.exports = Validator;