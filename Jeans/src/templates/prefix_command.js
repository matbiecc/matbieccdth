const { EmbedBuilder } = require('discord.js');
module.exports = {
    config: {
        name: '',
        description: '',
        category: '',
        aliases: [''],
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
            // code here
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
