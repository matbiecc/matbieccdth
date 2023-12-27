const { EmbedBuilder } = require('discord.js');
const random = require('random');
module.exports = {
    config: {
        name: 'pick',
        description: 'pick random',
        category: 'Fun',
        aliases: ['pk'],
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
            let choices = args
                .join(' ')
                .replace(/,/g, '')
                .replace(/;/g, '')
                .split(' ');
            let choice = choices[await random.int(0, choices.length - 1)];
            message.channel.send(choice);
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
