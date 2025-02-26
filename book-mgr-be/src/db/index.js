const mongoose = require('mongoose');

//给哪个数据库的哪个集合添加什么格式的文档

//Schema定义了mongo DB的一个集合的内容范式
//Model是根据schema生成的一套方法，可以用这套方法来操作mongo DB下的集合以及集合下的文档

// 定义用户模式
const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    age: Number,
});

// 创建用户模型
const UserModel = mongoose.model('User', UserSchema);

const connect = () => {
    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');

    // 当数据库连接成功时执行
    mongoose.connection.on('open', () => {
        console.log('连接成功');

        // 创建文档
        const user = new UserModel({
            nickname: '小明',
            password: '123456642135',
            age: 12,
        });

        // 保存文档到 MongoDB
        user.save();
    });
};

connect();