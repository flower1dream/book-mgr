const authRouter = require('./auth');

const registerRoutes = (app) => {
    app.use(authRouter.routes());
};

module.exports = registerRoutes;