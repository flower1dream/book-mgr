const Koa = require('koa'); // 注意：应该是 Koa 而不是 Koa
const app = new Koa();

// 通过 app.use 注册中间件
// 中间件本质上就是一个函数
// context 上下文 — 当前请求的相关信息都在里面
app.use((context) => {
    // 对象的解构
    const { request: req } = context;
    const { url } = req;

    if (url === '/user') {
        context.body = '<h1>哈哈哈<h1>';
        return;
    }

    context.body = '??';
});

// 添加一个简单的路由
app.use(async (ctx, next) => {
    if (ctx.url === '/hello') {
        ctx.body = 'Hello, World!';
    } else {
        await next(); // 调用下一个中间件
    }
});

// 启动服务器
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

console.log('112333');
