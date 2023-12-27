const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');
require('dotenv').config();
const axios = require('axios');
module.exports = {
    name: 'Banner',
    type: 2,
    run: async (client, interaction, config, db) => {
        const user = interaction.guild.members.cache.get(interaction.targetId);
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
                    `[**Banner**](${banner}) của **${user.user.tag}** `
                )
                .setColor(config.DiscordColor)
                .setImage(banner)
                .setFooter({
                    text: `Yêu cầu bởi ${user.user.tag}`,
                })
                .setTimestamp();
            interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }, 1000);
    },
};
