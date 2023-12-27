const { EmbedBuilder } = require('discord.js');
module.exports = {
    config: {
        name: 'roleinfo',
        description: 'Xem thông tin về một role',
        category: 'Info',
        aliases: ['role'],
        usage: 'roleinfo (role)',
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    botPermissions: ['ManageRoles'],
    owner: false,
    run: async ({ client, message, args, prefix, config, report, log }) => {
        try {
            if (['@everyone', '@here'].includes(args[0]))
                return message.error(`\`${args[0]}\` không phải là một role!`);
            if (!args[0]) return message.error('Vui lòng nhập một role');
            const role =
                message.mentions.roles.first() ||
                message.guild.roles.cache.get(args[0]) ||
                message.guild.roles.cache.find(
                    (r) =>
                        r.name.toLowerCase() ===
                        args.join(' ').toLocaleLowerCase()
                );
            if (!role) return message.error('Không tìm thấy role');
            const embed = new EmbedBuilder()
                .setTitle(`Thông tin về role __${role.name}__`)
                .setColor(role.color || config.DiscordColor)
                .addFields(
                    {
                        name: 'Role ID:',
                        value: role.id.toString(),
                        inline: true,
                    },
                    {
                        name: 'Số thành viên có:',
                        value: role.members.size.toString(),
                        inline: true,
                    },
                    {
                        name: 'username được không:',
                        value: role.mentionable ? 'Có' : 'Không',
                        inline: true,
                    },
                    {
                        name: 'Vị trí:',
                        value: role.position.toString(),
                        inline: true,
                    },
                    {
                        name: 'Màu:',
                        value: role.hexColor.toString(),
                        inline: true,
                    },
                    {
                        name: 'Có để hiện không: ',
                        value: role.hoist ? 'CÓ' : 'Không',
                        inline: true,
                    },
                    {
                        name: 'Ngày tạo:',
                        value: `<t:${Math.floor(role.createdAt / 1000)}:R>`,
                        inline: true,
                    },
                    {
                        name: 'Emoji:',
                        value: role.unicodeEmoji ? role.unicodeEmoji : 'Không',
                        inline: true,
                    },
                    {
                        name: 'Permissions:',
                        value: `\`\`\`ansi\n${role.permissions
                            .toArray()
                            .map((e) => `[0;34m${e}[0;38m`)
                            .join(', ')}\`\`\``,
                        inline: false,
                    }
                )
                .setFooter({
                    text: `Yêu cầu bởi ${message.author.username}`,
                })
                .setTimestamp();
            message.channel.send({
                embeds: [embed],
            });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
