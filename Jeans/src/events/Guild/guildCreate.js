const report = require('../../utils/report.js');
const log = require('../../utils/logger.js');
module.exports = {
    name: 'guildCreate',
    run: async (client, guild) => {
        report.guild(guild, client.shard.ids[0], 'join');
    },
};
