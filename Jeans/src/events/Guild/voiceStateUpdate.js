// const { Database } = require('quickmongo');
// const db = new Database(process.env.MONGODB);
// db.connect();
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    name: 'voiceStateUpdate',
    run: async (client, oldstate, newstate) => {
        if (oldstate.member.id !== client.user.id) return;
        if (
            newstate.channelId == null &&
            (await db.get(`tts.${oldstate.guild.id}.speaking`)) == true
        ) {
            await db.set(`tts.${oldstate.guild.id}.speaking`, false);
        }
    },
};
