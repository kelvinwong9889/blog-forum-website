const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

hashtagSchema.index({ name: 1 });

module.exports = mongoose.model('Hashtag', hashtagSchema);