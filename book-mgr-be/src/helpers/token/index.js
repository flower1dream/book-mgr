const jwt = require('jsonwebtoken');
const config = require('../../project.config');
const koaJwt = require('koa-jwt');

const getToken = (ctx) => {
    let { authorization } = ctx.header;
    return authorization.replace('Bearer ', '').replace('bearer ', '');
    // 最终返回处理后的字符串，即去掉了 'Bearer ' 或 'bearer ' 后的令牌
};

const verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, payload) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(payload);
        });
    });
};

const middleware = (app) => {
    app.use(koaJwt({
        secret: config.JWT_SECRET,
    }).unless({
        path: [
            /^\/auth\/login/,
            /^\/auth\/register/,
        ],
    }));
};

const catchTokenError = async (ctx, next) => {
    return next().catch((error) => {
        if (error.status === 401) {
            ctx.status = 401;

            ctx.body = {
                code: 0,
                msg: 'token error',
            };
        } else {
            throw error;
        }
    });
};

module.exports = {
    verify,
    getToken,
    middleware,
    catchTokenError,
};
