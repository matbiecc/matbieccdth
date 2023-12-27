const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    config: {
        name: 'userinfo',
        description: 'Xem thông tin người dùng',
        category: 'Info',
        aliases: ['whois', 'user', 'ui'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, args, prefix, config, report, log }) => {
        try {
            let user =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]) ||
                message.guild.members.cache.get(message.author.id);
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
                            if (userInput.id === message.guild.ownerId)
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
                        name: 'username',
                        value: `${user.user.username}`,
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
                    text: `Yêu cầu bởi ${message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                });
            message.reply({
                embeds: [embed],
                allowedMentions: { repliedUser: false },
            });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
            return message.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
    },
};
