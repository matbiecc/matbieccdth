const { EmbedBuilder } = require('discord.js');
const report = require('../../../utils/report.js');
const log = require('../../../utils/logger.js');
const dayjs = require('dayjs');
module.exports = {
    config: {
        name: 'news',
        description: 'Xem tin tức mới của bot',
        category: 'Info',
        aliases: ['tintuc', 'baomoi'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, args, prefix, config, func, db }) => {
        try {
            return message.error('Lệnh này đã bị vô hiệu hóa!\nvui lòng inbox cho <@844973596731899904>');
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
