const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Router = require('@koa/router');
const config = require('../../project.config');
const { saveFileToDisk, getUploadFileExt } = require('../../helpers/upload');

const router = new Router({
    prefix: '/upload'
});


router.post('/file', async (ctx) => {
    try {
        // 获取文件扩展名，并使用 uuid 生成新的文件名
        const ext = getUploadFileExt(ctx);
        const filename = `${uuidv4()}.${ext}`;
        // 将文件保存到指定目录
        await saveFileToDisk(ctx, path.resolve(config.UPLOAD_DIR, filename));
        ctx.body = {
            data: filename,
            msg: '文件上传成功',
            code: 1
        };
    } catch (error) {
        console.error('上传错误:', error);
        ctx.status = 500;
        ctx.body = { msg: '上传失败', error: error.message, code: 0 };
    }
});

module.exports = router;
