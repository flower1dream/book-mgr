const Router = require('@koa/router');
const mongoose = require('mongoose');

const User = mongoose.model('User'); // User 是 Mongoose 模型

// 设置 authRouter
const router = new Router({
    prefix: '/auth'
});

router.post('/register', async (ctx) => {
    // console.log(ctx.request.body); // 注意：应该是 ctx.request.body，而不是 ctx.body

    const{
        account,
        password,
    } = ctx.request.body;

    const one = await User.findOne({
        account,
    }).exec();

    if (one){
        ctx.body = {
            code: 0,
            msg: '注册失败，已存在该用户',
            data: null,
        };
        return;
    }


    // 使用 user 作为实例变量名
    const user = new User({
        account: account, // 从请求体中获取账号
        password: password, // 从请求体中获取密码
    });

    const res = await user.save(); // 保存用户实例

    ctx.body = {
        code: 1,
        msg: '注册成功',
        data: res,
    };
});

router.post('/login', async (ctx) => {
    ctx.body = '登录成功';
});

module.exports = router;