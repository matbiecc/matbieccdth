const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');
require('dotenv').config();
const axios = require('axios');
module.exports = {
    name: 'Avatar',
    type: 2,
    run: async (client, interaction, config, db) => {
        const user = interaction.guild.members.cache.get(interaction.targetId);

        // Finals:
        const data = await axios
            .get(
                `https://discord.com/api/guilds/${interaction.guild.id}/members/${interaction.user.id}`,
                {
                    headers: {
                        Authorization: `Bot ${process.env.botTOKEN}`,
                    },
                }
            )
            .then((d) => d.data);
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('custom')
                .setLabel('Server Avatar')
                .setEmoji('869140895004524564')
                .setStyle(ButtonStyle.Primary)
        );
        const embed = new EmbedBuilder()
            .setTitle(`Avatar của ${user.user.tag}`)
            .setDescription(
                `[[Link ảnh]](${user.user.displayAvatarURL({
                    dynamic: true,
                    size: 2048,
                })})`
            )
            .setTimestamp()
            .setColor(config.DiscordColor)
            .setImage(
                `${user.user.displayAvatarURL({ dynamic: true })}` +
                    '?size=4096'
            )
            .setFooter({
                text: `Yêu cầu bởi ${interaction.user.tag}`,
            });
        let msg = await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true,
        });
        const filters = (i) =>
            i.isButton() && i.user.id === interaction.user.id;
        const collector = msg.createMessageComponentCollector({
            filters,
            time: 15000,
        });
        collector.on('collect', async (i) => {
            if (i.customId == 'custom') {
                let { member } = i;
                if (member.user.id != interaction.user.id)
                    return i.reply({
                        content: `Bạn không phải là chủ sở hữu của lệnh này!`,
                        ephemeral: true,
                    });
                if (!data.avatar) {
                    row.components[0].setDisabled(true);
                    await interaction.editReply({
                        embeds: [embed],
                        components: [row],
                    });
                    return i.reply({
                        content: `Người dùng không có Server Avatar!`,
                        ephemeral: true,
                    });
                }

                await i.deferUpdate();
                let url = data.avatar.startsWith('a_')
                    ? '.gif?size=4096'
                    : '.png?size=4096';
                url = `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${user.id}/avatars/${data.avatar}${url}`;

                embed.setImage(url);
                return await msg.editReply({ embeds: [embed] });
            }
        });
        collector.on('end', async (i) => {
            row.components[0].setDisabled(true);
            await interaction.editReply({ embeds: [embed], components: [row] });
        });
    },
};
