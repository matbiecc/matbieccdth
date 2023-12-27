const { EmbedBuilder } = require('discord.js');
module.exports = {
    config: {
        name: 'afk',
        description: 'Set AFK status',
        category: 'Fun',
        aliases: ['afk'],
        usage: 'afk [content]',
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ message, args, db, report, log }) => {
        try {
            let status = args.join(' ');
            if (!status) status = 'Không có lý do';
            let afk = await db.get(
                `afk_${message.author.id}_${message.guild.id}`
            );
            if (!afk) {
                await db.set(`afk_${message.author.id}_${message.guild.id}`, {
                    status: status,
                    time: Date.now(),
                });
                try {
                    if (
                        message.guild.members.me.permissions.has(
                            PermissionsBitField.resolve(
                                ['ManageNicknames'] || []
                            )
                        )
                    ) {
                        message.member.setNickname(
                            `[AFK] ${message.author.username}`
                        );
                    }
                } catch (e) {
                    if (e.message == 'Mising Permisson') return;
                }
                return message.success(
                    `Bạn đã đặt trạng thái sang rời xa bàn phím [AFK] với lý do: ${status}`
                );
            } else {
                return;
            }
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
