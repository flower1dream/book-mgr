const authRouter = require('./auth');
const inviteCode = require('./invite-code');
const book = require('./book');
const InventoryLog = require('./inventory-log');
const user = require('./user');

const registerRoutes = (app) => {
    app.use(authRouter.routes());
    app.use(inviteCode.routes());
    app.use(book.routes());
    app.use(InventoryLog.routes());
    app.use(user.routes());
};

module.exports = registerRoutes;