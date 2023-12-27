const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: String,
    userName: String,
    money: Number,
    jobId: String,
    jobLevel: Number,
    nextJobLevel: Number,
    daily: {
        streak: Number,
        last: Number,
        rewardTime: Number,
    },
    work: {
        times: Number,
        last: Number,
    },
    rob: {
        times: Number,
        last: Number,
    },
    anxin: {
        times: Number,
        last: Number,
    },
    thief: {
        times: Number,
        last: Number,
    },
    bag: {
        items: [Object],
        limit: Number,
    },
    bank: {
        enabled: Boolean,
        amount: Number,
        rewardTime: Number,
        isLocked: Boolean,
    },
    vote: {
        times: Number,
        last: Number,
    },
    autoFarm: {
        enabled: Boolean,
        startTime: Number,
        endTime: Number,
        reward: [Object],
    },
    captcha: {
        times: Number,
        count: Number,
        nextCheckCount: Number,
    },
    timeInPrison: Number,
});
module.exports = mongoose.model('user', schema);
