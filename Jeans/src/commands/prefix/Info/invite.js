const {
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
} = require('discord.js');
module.exports = {
    config: {
        name: 'invite',
        description: 'Mời bot vào server',
        category: 'Info',
        aliases: ['invite', 'vote'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, config, report, log }) => {
        try {
            return message.error('Lệnh này đã bị vô hiệu hóa!');
            const invite = `https://top.gg/bot/869120429665714186/invite/`;
            const vote = `https://top.gg/bot/869120429665714186/vote`;
            const embed = new EmbedBuilder()
                .setColor(config.DiscordColor)
                .setAuthor({
                    name: `Cảm ơn vì đã sử dụng ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setDescription(
                    `${config.emojis.tick} [Mời bot về server của bạn](${invite})\n ${config.emojis.tick} [Vote cho bot tại Top.gg](${vote})`
                )
                .setThumbnail(
                    `https://cdn.discordapp.com/emojis/869786743904301076.gif?v=1`
                );
            let button = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL(invite)
                .setEmoji('869140895042261023')
                .setLabel('Mời bot');
            let button2 = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL(vote)
                .setEmoji('869140895042261023')
                .setLabel('Vote bot');
            let button3 = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/jf8EecYna5')
                .setEmoji('869140895042261023')
                .setLabel('Server hỗ trợ');

            let row = new ActionRowBuilder().addComponents(
                button,
                button2,
                button3
            );
            message.channel.send({
                embeds: [embed],
                components: [row],
            });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
