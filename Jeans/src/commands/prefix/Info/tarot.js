const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const tarotData = require('../../../config/tarot.json');
const random = require('random');
module.exports = {
    config: {
        name: 'tarot',
        description: 'Xem bói tarot',
        category: 'Info',
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, args, prefix, config, report, log }) => {
        try {
            tarot = tarotData[random.int(0, tarotData.length - 1)];
            const embed = new EmbedBuilder()
                .setColor(config.DiscordColor)
                .setAuthor({
                    name: `${message.author.username} đã bốc được lá ${tarot.name}`,
                    iconURL: message.member.user.displayAvatarURL({
                        dynamic: true,
                    }),
                })
                .addFields(
                    {
                        name: 'Từ khóa',
                        value: `${tarot.vi.reversed}`,
                        inline: false,
                    },
                    {
                        name: 'Ý nghĩa',
                        value: `${tarot.vi.interpretation}`,
                        inline: false,
                    },
                    {
                        name: 'Mô tả',
                        value: `${tarot.vi.description.split('\n')[0]}`,
                        inline: false,
                    }
                )
                .setTimestamp()
                .setFooter({
                    text: `©️ Tarot - ${tarot.suite}`,
                })
                .setImage(tarot.image);
            tarot.vi.description
                .split('\n')
                .slice(1)
                .forEach((e) => {
                    embed.addFields({
                        name: '{down_arrow}'.emoji,
                        value: e,
                        inline: false,
                    });
                });
            return message.channel.send({
                embeds: [embed],
            });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
