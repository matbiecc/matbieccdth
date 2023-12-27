const { EmbedBuilder, PermissionsBitField } = require('discord.js');
let report = require('../../../utils/report.js');
let log = require('../../../utils/logger.js');
module.exports = {
    name: 'User Info',
    type: 2,
    run: async (client, interaction, config, db) => {
        try {
            const user = interaction.guild.members.cache.get(
                interaction.targetId
            );
            const acknowledgements = {
                fetch: {
                    user(userInput) {
                        let result;

                        try {
                            if (
                                userInput.permissions.has(
                                    PermissionsBitField.ViewChannel
                                )
                            )
                                result = 'Server Member';
                            if (
                                userInput.permissions.has(
                                    PermissionsBitField.KickMembers
                                )
                            )
                                result = 'Server Moderator';
                            if (
                                userInput.permissions.has(
                                    PermissionsBitField.ManageServer
                                )
                            )
                                result = 'Server Manager';
                            if (
                                userInput.permissions.has(
                                    PermissionsBitField.Administrator
                                )
                            )
                                result = 'Server Administrator';
                            if (userInput.id === interaction.guild.ownerId)
                                result = 'Server Owner';
                        } catch (e) {
                            log.error(e.message, e.stack);
                            report.error(e.message, e.stack);
                            result = 'Server Member';
                        }

                        return result;
                    },
                },
            };

            const embed = new EmbedBuilder()
                .setColor(config.DiscordColor)
                .setAuthor({
                    name: `${user.user.username} Infomation`,
                    iconURL: user.displayAvatarURL({ dynamic: true }),
                })
                .addFields(
                    {
                        name: 'ID',
                        value: `${user.id}`,
                        inline: true,
                    },
                    {
                        name: 'Tag',
                        value: `${user.user.tag}`,
                        inline: true,
                    },
                    {
                        name: `Roles [${user._roles.length}]`,
                        value: `${
                            user._roles.length
                                ? `<@&${user._roles.join('>, <@&')}>`
                                : 'Không có'
                        }`,
                        inline: false,
                    },
                    {
                        name: 'Joined At',
                        value: `<t:${Math.floor(
                            user.joinedTimestamp / 1000
                        )}:R>`,
                        inline: true,
                    },
                    {
                        name: 'Created At',
                        value: `<t:${Math.floor(
                            user.user.createdTimestamp / 1000
                        )}:R>`,
                        inline: true,
                    },
                    {
                        name: 'Acknowledgements',
                        value: `${acknowledgements.fetch.user(user)}`,
                        inline: true,
                    },
                    {
                        name: 'Permissions',
                        value: `\`\`\`fix\n${
                            user.permissions
                                ? user.permissions
                                      .toArray()
                                      .map((e) => `${e}`)
                                      .join(', ')
                                : 'Không có'
                        }\`\`\``,
                        inline: false,
                    }
                )
                .setTimestamp()
                .setFooter({
                    text: `Yêu cầu bởi ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                    }),
                });

            // Finals:
            return interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
            return interaction.reply({
                content: `Đã xảy ra lỗi khi thực hiện lệnh này!`,
                ephemeral: true,
            });
        }
    },
};
