const { EmbedBuilder } = require('discord.js');
module.exports = {
    config: {
        name: 'clean',
        description: 'Xoá tin nhắn từ bot',
        category: 'Info',
        aliases: [''],
        cooldown: 10,
    },
    permissions: ['SendMessages', 'ManageMessages'],
    owner: false,
    run: async ({ client, message, report, log }) => {
        try {
            if (message.deletable) await message.delete();
            message.channel.messages
                .fetch({
                    limit: 100,
                })
                .then(async (messages) => {
                    messages = messages.filter(
                        (msg) => msg.author.id === client.user.id
                    );
                    try {
                        await message.channel.bulkDelete(messages, true);
                        await message.channel.send('👌 Done').then((msg) => {
                            if (msg) setTimeout(() => msg.delete(), 10000);
                        });
                    } catch (e) {
                        message.error(`Có lỗi xảy ra vui lòng thử lại sau!`);
                        return;
                    }
                });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
