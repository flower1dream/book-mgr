const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// const { getBody } = require('../helpers/utils');

const BookClassify = mongoose.model('BookClassify');

const router = new Router({
    prefix: '/book-classify',
});

router.get('/list', async (ctx) => {
    // Your code here
});

module.exports = router;