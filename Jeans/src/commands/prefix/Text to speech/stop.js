const { EmbedBuilder } = require('discord.js');
module.exports = {
    config: {
        name: 'stop',
        description: 'Stop text to speech',
        category: 'Text to speech',
        aliases: ['stop'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, db, report, log }) => {
        try {
            if ((await db.get(`tts.${message.guild.id}.speaking`)) === false) {
                return message.error(
                    'Tớ đang không đọc gì cả, hãy thử lại sau!'
                );
            } else {
                await db.set(`tts.${message.guild.id}.speaking`, false);
                client.player.stop();
                return message.success('Đã dừng đọc!');
            }
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
