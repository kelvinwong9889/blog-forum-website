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
});

// 驗證：post_id 和 comment_id 至少一個非空
likeSchema.pre('save', function (next) {
    if (!this.post_id && !this.comment_id) {
        next(new Error('Either post_id or comment_id must be provided'));
    }
    next();
});

// 確保用戶對同一帖子或評論只能點贊一次
likeSchema.index({ user_id: 1, post_id: 1, comment_id: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);