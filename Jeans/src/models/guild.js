const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    guildId: String,
    prefix: String,
    modules: {
        chatbot: {
            enabled: Boolean,
            channelId: String,
        },
        noitu: {
            enabled: Boolean,
            channelId: String,
        },
        chatgpt: {
            enabled: Boolean,
            channelId: String,
        },
        autorespone: {
            enabled: Boolean,
            mention: Boolean,
            data: [Object],
        },
    },
    premiumTime: Number,
    language: String,
    commandUsed: Number,
});
module.exports = mongoose.model('guilds', schema);
