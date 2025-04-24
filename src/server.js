const express = require('express');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/database');
const { port } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 中間件
app.use(helmet());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));

// API 路由
app.use('/api', require('./routes/index'));

// 靜態頁面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// 錯誤處理
app.use(errorHandler);

// 連接到 MongoDB 並啟動伺服器
connectDB().then(() => {
    app.listen(port, () => console.log(`伺服器運行在端口 ${port}`));
});