const Koa = require('koa');
const koaBody = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const cors = require('@koa/cors');
const { middleware: koaJwtMiddleware, catchTokenError } = require('./helpers/token');
const { logMiddleware } = require('./helpers/log');

const app = new Koa();

connect().then(() => {
    app.use(cors());
    app.use(koaBody.koaBody());
    // 注意这里可能有问题

    app.use(catchTokenError);

    koaJwtMiddleware(app);

    app.use(logMiddleware);
    
    registerRoutes(app);

    // 开启一个 http 服务
    app.listen(3000, () => {
        console.log('启动成功');
    });
}).catch((err) => {
    console.error('启动失败', err);
});