const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');
const { verify, getToken } = require('../../helpers/token');
// const { getBody } = require('../helpers/utils');
const User = mongoose.model('User');
const Character = mongoose.model('Character');
const { loadExcel, getFirstSheet } = require('../../helpers/excel')


const router = new Router({
    prefix: '/user',
});

router.get('/list', async (ctx) => {
    let {
        page,
        size,
        keyword,
    } = ctx.query;

    page = Number(page);
    size = Number(size);

    const query = {};

    if (keyword) {
        query.account = keyword;
    };

    const list = await User
        .find(query)
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await User.countDocuments().exec();

    ctx.body = {
        msg: '获取列表成功',
        data: {
            list,
            page,
            size,
            total,
        },
        code: 1,
    };
});

router.delete('/:id', async (ctx) => {
    const {
        id,
    } = ctx.params;

    const delMsg = await User.deleteOne({
        _id: id,
    });

    ctx.body = {
        data: delMsg,
        code: 1,
        msg: '删除成功',
    };
});

router.post('/add', async (ctx) => {
    const {
        account,
        password,
        character,
    } = ctx.request.body;

    const char = await Character.findOne({
        _id: character,
    })

    if (!char) {
        ctx.body = {
            msg: '出错啦',
            code: 0,
        };

        return;
    };

    const user = new User({
        account,
        password: password || config.DEFAULT_PASSWORD,
        character,
    });

    const res = await user.save()

    ctx.body = {
        data: res,
        code: 1,
        msg: '添加成功',
    };
});

router.post('/reset/password', async (ctx) => {
    const {
        id,
    } = ctx.request.body;

    const user = await User.findOne({
        _id: id,
    }).exec();

    if (!user) {
        ctx.body = {
            msg: '找不到用户',
            code: 0,
        };
        return;
    };

    user.password = config.DEFAULT_PASSWORD;
    const res = await user.save();

    ctx.body = {
        msg: '修改成功',
        data: {
            account: res.account,
            _id: res._id,
        },
        code: 1,
    };
});

router.post('/update/character', async (ctx) => {
    const {
        character,
        userId,
    } = ctx.request.body;

    const char = await Character.findOne({
        _id: character,
    });

    if (!char) {
        ctx.body = {
            msg: '出错啦',
            code: 0,
        };
        return;
    }

    const user = await User.findOne({ _id: userId, });

    if (!user) {
        ctx.body = {
            msg: '出错啦',
            code: 0,
        };
        return;
    }

    user.character = character;

    const res = await user.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '修改成功',
    };
});

router.get('/info', async (ctx) => {
    // Authorization: Bearer $%^7865fdgshgfdh 是一个示例令牌（token）的片段，
    // 通常在请求头中以 Authorization: Bearer <token> 的形式发送
    ctx.body = {
        data: await verify(getToken(ctx)),
        code: 1,
        msg: '获取成功',
    };
});


router.post('/addMany', async (ctx) => {
    const { key = '' } = ctx.request.body;

    if (!key.trim()) {
        ctx.body = { code: 0, msg: '上传的文件key无效，缺少文件名' };
        return;
    }

    const path = `${config.UPLOAD_DIR}/${key}`;
    // console.log('拼接后的文件路径：', path);

    // 确保路径指向的是文件，而不是目录
    const fs = require('fs');
    try {
        const stat = fs.statSync(path);
        if (!stat.isFile()) {
            throw new Error(`路径 ${path} 不是一个有效的文件`);
        }
    } catch (err) {
        console.error(err);
        ctx.body = { code: 0, msg: `文件读取失败：${err.message}` };
        return;
    }
    const excel = loadExcel(path);
    const sheet = getFirstSheet(excel);

    // console.log('Excel 文件中的行数:', sheet.length);
    // console.log('第1行内容:', sheet[0]);


    const character = await Character.find().exec();
    const member = character.find((item) => (item.name === 'member'));

    const arr = [];
    for (let i = 0; i < sheet.length; i++) {
        let record = sheet[i];
        // console.log(`处理第${i}行:`, record);
        const [account, password = config.DEFAULT_PASSWORD] = record;
        const one = await User.findOne({ account });
        if (one) {
            console.log(`用户 ${account} 已存在，跳过`);
            continue;
        }
        arr.push({
            account,
            password,
            character: member._id,
        });
    }
    // console.log('最终待插入数据：', arr);

    console.log('即将插入的用户数据:', arr);

    const insertedUsers = await User.insertMany(arr);
    console.log('插入的用户数：', insertedUsers.length);


    ctx.body = {
        code: 1,
        msg: '添加成功',
        data: {
            addCount: arr.length,
        },
    };
});


module.exports = router;