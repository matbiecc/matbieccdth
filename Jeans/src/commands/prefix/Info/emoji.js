const { EmbedBuilder } = require('discord.js');
module.exports = {
    config: {
        name: 'emoji',
        description: 'Phóng to emoji',
        category: 'Info',
        aliases: ['emo'],
        usage: 'emoji :emoji:',
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, args, prefix, config, report, log }) => {
        try {
            if (
                !args[0] ||
                !args[0].startsWith('<') ||
                !args[0].endsWith('>') ||
                !args[0].includes(':')
            ) {
                return message.error('Không tìm thấy emoji');
            }
            let Thinger = args[0].split(':');
            let Animated;
            if (Thinger[0] === '<a') {
                Animated = true;
            } else {
                Animated = false;
            }
            const Name = Thinger[1];
            const ID = Thinger[2].slice(0, -1);
            const Link = `https://cdn.discordapp.com/emojis/${ID}.${
                Animated ? 'gif' : 'png'
            }?v=1`;
            const emb = new EmbedBuilder()
                .setDescription(`\`${Name} ${ID}\``)
                .setImage(Link)
                .setURL(Link)
                .setColor(config.DiscordColor)
                .setFooter({
                    text: 'Sử dụng ' + prefix + 'addemoji để thêm emoji',
                    iconURL: client.user.displayAvatarURL(),
                });
            return message.channel.send({ embeds: [emb] });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
