const authRouter = require('./auth');
const inviteCode = require('./invite-code');
const book = require('./book');

const registerRoutes = (app) => {
    app.use(authRouter.routes());
    app.use(inviteCode.routes());
    app.use(book.routes());
};

module.exports = registerRoutes;