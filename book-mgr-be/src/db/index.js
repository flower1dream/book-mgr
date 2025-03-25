const mongoose = require('mongoose');
require('./Schmas/User');
require('./Schmas/InviteCode');
require('./Schmas/Book');
require('./Schmas/InventoryLog');

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/book-mgr', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('MongoDB 连接成功');
        })
        .catch((err) => {
            console.error('MongoDB 连接失败', err);
        });
};

module.exports = { connect };