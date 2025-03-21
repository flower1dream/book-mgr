const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const jwt = require('jsonwebtoken');


const User = mongoose.model('User'); // User 是 Mongoose 模型
const InviteCode = mongoose.model('InviteCode');

// 设置 authRouter
const router = new Router({
    prefix: '/auth'
});

router.post('/register', async (ctx) => {
    const {
        account,
        password,
        inviteCode } = getBody(ctx);


    // 标准化输入
    const trimmedAccount = account.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedInviteCode = inviteCode.trim();

    // 校验字段不能为空
    if (trimmedAccount === '' || trimmedPassword === '' || trimmedInviteCode === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        };
        return;
    }

    //检查邀请码是否有效
    const inviteCodeRecord = await InviteCode.findOne({ code: trimmedInviteCode }).exec();
    if (!inviteCodeRecord || inviteCodeRecord.user) {
        ctx.body = {
            code: 0,
            msg: '邀请码无效或已被使用',
            data: null,
        };
        return;
    }

    // 检查用户是否已存在
    const existingUser = await User.findOne({ account: trimmedAccount }).exec();
    if (existingUser) {
        ctx.body = {
            code: 0,
            msg: '注册失败，已存在该用户',
            data: null,
        };
        return;
    }

    // 创建新用户
    const user = new User({
        account: trimmedAccount,
        password: trimmedPassword,
    });

    //把创建的用户同步到mongoDB
    const res = await user.save();

    inviteCodeRecord.user = res._id;
    inviteCodeRecord.meta.updateAt = new Date().getTime();
    await inviteCodeRecord.save();

    //响应成功
    ctx.body = {
        code: 1,
        msg: '注册成功',
        data: res,
    };
});

router.post('/login', async (ctx) => {
    const { account, password } = getBody(ctx);

    // 标准化输入
    const trimmedAccount = account.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // 校验字段不能为空
    if (trimmedAccount === '' || trimmedPassword === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        };

        return;
    }
    // 查询用户
    const one = await User.findOne({ account: trimmedAccount }).exec();
    if (!one) {
        ctx.body = {
            code: 0,
            msg: '用户名不存在',
            data: null,
        };
        return;
    }
    const user = {
        account: one.account,
        _id: one._id,
    }

    // 验证密码
    if (one.password === trimmedPassword) {
        ctx.body = {
            code: 1,
            msg: '登录成功',
            data: {
                user,
                token: jwt.sign(user, 'book-mgr'),
            },
        };
        return;
    }

    ctx.body = {
        code: 0,
        msg: '用户名或密码错误',
        data: null,
    };
});
module.exports = router;