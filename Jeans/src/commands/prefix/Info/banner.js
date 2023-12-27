require('dotenv').config();
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');
const axios = require('axios');
module.exports = {
    config: {
        name: 'banner',
        description: 'Xem banner của 1 người dùng',
        category: 'Info',
        usage: 'banner [@user]',
        cooldown: 5,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ message, args, config, report, log }) => {
        try {
            const user =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]) ||
                message.member;
            const data = await axios
                .get(`https://discord.com/api/v9/users/${user.user.id}`, {
                    headers: {
                        Authorization: `Bot ${process.env.botTOKEN}`,
                    },
                })
                .then((d) => d.data);
            let receive = '';
            let banner =
                'https://cdn.discordapp.com/attachments/869184452234989578/870944134406471700/unknown.png';

            receive = data['banner'];
            if (receive !== null) {
                const gif = await axios.get(
                    `https://cdn.discordapp.com/banners/${user.user.id}/${receive}.gif`,
                    {
                        headers: {
                            Authorization: `Bot ${process.env.botTOKEN}`,
                        },
                    }
                );
                if (gif.status) {
                    banner = `https://cdn.discordapp.com/banners/${user.user.id}/${receive}.gif?size=1024`;
                } else {
                    banner = `https://cdn.discordapp.com/banners/${user.user.id}/${receive}.png?size=1024`;
                }
            }
            setTimeout(() => {
                let embed = new EmbedBuilder()
                    .setDescription(
                        `[**Banner**](${banner}) của **${user.user.username}** `
                    )
                    .setColor(config.DiscordColor)
                    .setImage(banner)
                    .setFooter({
                        text: `Yêu cầu bởi ${user.user.username}`,
                    })
                    .setTimestamp();
                message.reply({
                    embeds: [embed],
                    allowedMentions: { repliedUser: false },
                });
            }, 1000);
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
