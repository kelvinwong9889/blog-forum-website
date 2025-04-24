const hashtagRepository = require('../repositories/hashtagRepository');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

class HashtagService {
    async createHashtag(hashtagData) {
        if (!hashtagData.name) {
            throw new Error(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
        }
        let hashtag = await hashtagRepository.findByName(hashtagData.name);
        if (hashtag) {
            return hashtag;
        }
        return await hashtagRepository.create(hashtagData);
    }

    async getHashtagById(id) {
        const hashtag = await hashtagRepository.findById(id);
        if (!hashtag) {
            const error = new Error(ERROR_MESSAGES.HASHTAG_NOT_FOUND);
            error.status = 404;
            throw error;
        }
        return hashtag;
    }

    async getAllHashtags() {
        return await hashtagRepository.findAll();
    }

    async deleteHashtag(id) {
        const hashtag = await hashtagRepository.findById(id);
        if (!hashtag) {
            const error = new Error(ERROR_MESSAGES.HASHTAG_NOT_FOUND);
            error.status = 404;
            throw error;
        }
        return await hashtagRepository.delete(id);
    }
}

module.exports = new HashtagService();