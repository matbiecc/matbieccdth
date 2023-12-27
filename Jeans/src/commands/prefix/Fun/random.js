const { EmbedBuilder } = require('discord.js');
const random = require('random');
module.exports = {
    config: {
        name: 'random',
        description: 'random number',
        category: 'Fun',
        aliases: ['r'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({
        client,
        message,
        args,
        prefix,
        config,
        func,
        db,
        report,
        log,
    }) => {
        try {
            let min = parseInt(args[0]);
            let max = parseInt(args[1]);
            if (isNaN(min)) {
                min = 0;
                max = 10;
            }
            if (isNaN(max)) {
                max = min;
                min = 0;
            }
            if (min > max) {
                let temp = min;
                min = max;
                max = temp;
            }
            let rand = await random.int(min, max);
            message.reply({
                content: `{play} Số may mắn của bạn là: **${rand}**`.emoji,
                allowedMentions: { repliedUser: false },
                fetchReply: true,
            });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
