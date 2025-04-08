const Koa = require('koa');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body')
const { middleware: koaJwtMiddleware, catchTokenError } = require('./helpers/token');
const { logMiddleware } = require('./helpers/log');

const app = new Koa();

connect().then(() => {
    app.use(cors());
    app.use(koaBody({
        multipart: true,  // 启用文件上传
        formidable: {
            maxFileSize: 200 * 1024 * 1024, // 限制200MB
        }
    }));

    app.use(catchTokenError);

    // koaJwtMiddleware(app);

    // app.use(logMiddleware);

    registerRoutes(app);

    // 开启一个 http 服务
    app.listen(3000, () => {
        console.log('启动成功');
    });
}).catch((err) => {
    console.error('启动失败', err);
});