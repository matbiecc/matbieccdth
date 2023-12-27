const { EmbedBuilder } = require('discord.js');
const IE = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'];
const dayjs = require('dayjs');
module.exports = {
    config: {
        name: 'esnipe',
        description: 'Xem tin nhắn đã edit gần nhất trong kênh',
        category: 'Fun',
        usage: 'esnipe [page]',
        aliases: ['es'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, prefix, args, config, report, log }) => {
        try {
            let esnipes = client.esnipes.get(message.channel.id) || [];
            if (!esnipes.length)
                return message.error('Không có tin nhắn nào để esnipe!');
            let p = args[0] || 1;
            if (p == 'all') {
                const AllEsnipeEmbed = new EmbedBuilder()
                    .setColor(config.DiscordColor)
                    .setAuthor({
                        name: `Tất cả tin nhắn được edit trong #${message.channel.name}`,
                        iconURL: message.guild.iconURL({ dynamic: true }),
                    })
                    .setDescription(
                        esnipes
                            .map((s) => {
                                return `**{reply} Before**: ${
                                    s.old_content
                                }\n**{pen} After**: ${
                                    s.new_content
                                }\n**{clock} Thời gian xoá**: <t:${Math.floor(
                                    s.date / 1000
                                )}:T>`.emoji;
                            })
                            .join('\n\n')
                    )
                    .setFooter({
                        text: `${prefix}esnipe [page] để xem tin nhắn chi tiết!`,
                    });
                return message.followUp(AllEsnipeEmbed);
            } else {
                p = parseInt(p);
                if (isNaN(p) || p > esnipes.length || p < 1)
                    return message.error(
                        `Vui lòng nhập một số từ \`1-${esnipes.length}\`!`
                    );
                let esnipe = esnipes[p - 1];
                const EsnipeEmbed = new EmbedBuilder()
                    .setColor(config.DiscordColor)
                    .setAuthor({
                        name: `Tin nhắn được edit bởi ${esnipe.author.username}`,
                        iconURL: esnipe.author.avatarURL,
                    })
                    .setFields(
                        {
                            name: `{reply} Before`.emoji,
                            value: esnipe.old_content,
                        },
                        {
                            name: `{pen} After`.emoji,
                            value: esnipe.new_content,
                        },
                        {
                            name: `{clock} Thời gian xoá`.emoji,
                            value: `${dayjs(esnipe.date).format(
                                'YYYY-MM-DD HH:mm:ss'
                            )} <t:${Math.floor(esnipe.date / 1000)}:R>`,
                        }
                    )
                    .setTimestamp();
                if (esnipe.attachments.size) {
                    let i = 0;
                    let files = [];
                    for (const [key, value] of esnipe.attachments) {
                        if (IE.includes(value.name.split('.').pop())) {
                            EsnipeEmbed.setImage(value.url);
                        } else {
                            i++;
                            files.push(`${i}. [${value.name}](${value.url})`);
                        }
                    }
                    if (files.length) {
                        EsnipeEmbed.addFields({
                            name: `{file} Tệp đính kèm`.emoji,
                            value: files.join('\n'),
                        });
                    }
                }
                EsnipeEmbed.setFooter({
                    text: `Trang ${p}/${esnipes.length}`,
                });
                message.followUp(EsnipeEmbed);
            }
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
