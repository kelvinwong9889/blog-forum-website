const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const path = require('path');

dotenv.config();
const app = express();

// 中間件
app.use(helmet());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// 路由
app.use('/api/users', require('./routes/user'));
app.use('/api/categories', require('./routes/category'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/comments', require('./routes/comment'));
app.use('/api/likes', require('./routes/like'));
app.use('/api/hashtags', require('./routes/hashtag')); // 更新
app.use('/api/post-hashtags', require('./routes/postHashtag')); // 更新

// 靜態頁面
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', path.basename(req.path) || 'index.html'));
});

// 連接到 MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('成功連接到 MongoDB'))
    .catch(err => console.error('MongoDB 連接失敗:', err));

// 啟動服務器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`服務器運行在端口 ${PORT}`));