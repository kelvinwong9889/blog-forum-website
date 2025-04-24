const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    }
}, {
    timestamps: true
}, {
    indexes: [
        { key: { user_id: 1, post_id: 1 }, unique: true, sparse: true },
        { key: { user_id: 1, comment_id: 1 }, unique: true, sparse: true },
    ]
});

likeSchema.index({ post_id: 1 });
likeSchema.index({ comment_id: 1 });

module.exports = mongoose.model('Like', likeSchema);