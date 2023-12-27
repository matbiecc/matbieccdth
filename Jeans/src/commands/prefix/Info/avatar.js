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
        name: 'avatar',
        description: 'Xem avatar của ai đó 😳',
        category: 'Info',
        aliases: ['av', 'avt'],
        usage: 'avatar [@user]',
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
                .get(
                    `https://discord.com/api/guilds/${message.guild.id}/members/${message.author.id}`,
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
                .setTitle(`Avatar của ${user.user.username}`)
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
                    text: `Yêu cầu bởi ${message.author.username}`,
                });
            let msg = await message.reply({
                embeds: [embed],
                components: [row],
                allowedMentions: { repliedUser: false },
            });
            const filters = (i) =>
                i.isButton() && i.user.id === message.author.id;
            const collector = msg.createMessageComponentCollector({
                filters,
                time: 15000,
            });
            collector.on('collect', async (i) => {
                if (i.customId == 'custom') {
                    let { member } = i;
                    if (member.user.id != message.author.id)
                        return i.reply({
                            content: `Bạn không phải là chủ sở hữu của lệnh này!`,
                            ephemeral: true,
                        });
                    if (!data.avatar) {
                        row.components[0].setDisabled(true);
                        await msg.edit({ embeds: [embed], components: [row] });
                        return i.reply({
                            content: `Người dùng không có Server Avatar!`,
                            ephemeral: true,
                        });
                    }

                    await i.deferUpdate();
                    let url = data.avatar.startsWith('a_')
                        ? '.gif?size=4096'
                        : '.png?size=4096';
                    url = `https://cdn.discordapp.com/guilds/${message.guild.id}/users/${user.id}/avatars/${data.avatar}${url}`;

                    embed.setImage(url);
                    return await msg.edit({ embeds: [embed] });
                }
            });
            collector.on('end', async (i) => {
                row.components[0].setDisabled(true);
                await msg.edit({ embeds: [embed], components: [row] });
            });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
