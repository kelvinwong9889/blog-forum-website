const mongoose = require('mongoose');
const { mongoUri } = require('./env');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('成功連接到 MongoDB');
    } catch (error) {
        console.error('MongoDB 連接失敗:', error);
        process.exit(1);
    }
};

module.exports = connectDB;