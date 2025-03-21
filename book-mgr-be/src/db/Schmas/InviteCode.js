const mongoose = require('mongoose');
const {getMeta} = require('../helpers')

const InviteCodeSchema = new mongoose.Schema({
    //邀请码
    code:String,
    //用来注册哪个用户
    user:String,

    meta: getMeta(),
});

mongoose.model('InviteCode', InviteCodeSchema);