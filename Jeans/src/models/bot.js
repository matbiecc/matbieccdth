const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    botId: String,
    botMoney: Number,
    lotteries: [Object],
    shopItems: [Object],
    guildBlacklist: [String],
    userBlacklist: [String],
    premiumGuilds: [Object],
    marriedUsers: [Object],
    gifts: [Object],
    news: [Object],
});
module.exports = mongoose.model('bot', schema);
