const Koa = require('koa');
const koaBody = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const cors = require('@koa/cors');


const app = new Koa();

connect().then(() => {
    app.use(cors());
    app.use(koaBody.koaBody());
    // 注意这里可能有问题
    registerRoutes(app);

    // 开启一个 http 服务
    app.listen(3000, () => {
        console.log('启动成功');
    });
}).catch((err) => {
    console.error('启动失败', err);
});