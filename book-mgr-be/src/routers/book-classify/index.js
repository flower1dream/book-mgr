const Router = require('@koa/router');
const mongoose = require('mongoose');

const BookClassify = mongoose.model('BookClassify');

const router = new Router({
    prefix: '/book-classify',
});

// 获取分类列表
router.get('/list', async (ctx) => {
    const list = await BookClassify.find().sort({ _id: -1 }).exec();

    ctx.body = {
        data: list,
        code: 1,
        msg: '获取成功',
    };
});

// 添加分类
router.post('/add', async (ctx) => {
    const { title } = ctx.request.body;

    if (!title) {
        ctx.body = {
            code: 0,
            msg: '标题不能为空'
        };
        return;
    }

    const one = await BookClassify.findOne({ title }).exec();

    if (one) {
        ctx.body = {
            code: 0,
            msg: '书籍分类已经存在',
        };
        return;
    }

    const bookClassify = new BookClassify({ title }); // 先创建实例
    const saved = await bookClassify.save(); // 再保存实例

    ctx.body = {
        data: saved,
        code: 1,
        msg: '创建成功',
    };
});

// 删除分类
router.delete('/:id', async (ctx) => {
    const { id } = ctx.params;

    const doc = await BookClassify.findById(id);
    if (!doc) {
        ctx.body = {
            code: 0,
            msg: '资源不存在'
        };
        return;
    }

    const res = await BookClassify.deleteOne({ _id: id });

    ctx.body = {
        data: res,
        code: 1,
        msg: '删除成功',
    };
});

// 更新分类标题
router.post('/update/title', async (ctx) => {
    const { id, title } = ctx.request.body;

    if (!title) {
        ctx.body = {
            code: 0,
            msg: '标题不能为空'
        };
        return;
    }

    const existing = await BookClassify.findOne({ title });
    if (existing && existing._id.toString() !== id) {
        ctx.body = {
            code: 0,
            msg: '该标题已存在'
        };
        return;
    }

    const one = await BookClassify.findById(id);
    if (!one) {
        ctx.body = {
            msg: '资源不存在',
            code: 0,
        };
        return;
    }

    one.title = title;
    const res = await one.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '更新成功',
    };
});

module.exports = router;