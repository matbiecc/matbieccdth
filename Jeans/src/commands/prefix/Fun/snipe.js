const { EmbedBuilder } = require('discord.js');
const IE = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'];
const dayjs = require('dayjs');
module.exports = {
    config: {
        name: 'snipe',
        description: 'Xem tin nhắn đã xoá gần nhất trong kênh',
        category: 'Fun',
        usage: 'snipe [page]',
        aliases: [''],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, prefix, args, config, report, log }) => {
        try {
            let snipes = client.snipes.get(message.channel.id) || [];
            if (!snipes.length)
                return message.error('Không có tin nhắn nào để snipe!');
            let p = args[0] || 1;
            if (p == 'all') {
                const AllSnipeEmbed = new EmbedBuilder()
                    .setColor(config.DiscordColor)
                    .setAuthor({
                        name: `Tất cả tin nhắn được xoá trong #${message.channel.name}`,
                        iconURL: message.guild.iconURL({ dynamic: true }),
                    })
                    .setDescription(
                        snipes
                            .map((s) => {
                                return `**{pen} Nội dung**: ${
                                    s.content
                                }\n**{clock} Thời gian xoá**: <t:${Math.floor(
                                    s.date / 1000
                                )}:T>`.emoji;
                            })
                            .join('\n\n')
                    )
                    .setFooter({
                        text: `${prefix}snipe [page] để xem tin nhắn chi tiết!`,
                    });
                return message.followUp(AllSnipeEmbed);
            } else {
                p = parseInt(p);
                if (isNaN(p) || p > snipes.length || p < 1)
                    return message.error(
                        `Vui lòng nhập một số từ \`1-${snipes.length}\`!`
                    );
                let snipe = snipes[p - 1];
                const SnipeEmbed = new EmbedBuilder()
                    .setColor(config.DiscordColor)
                    .setAuthor({
                        name: `Tin nhắn được xoá bởi ${snipe.author.username}`,
                        iconURL: snipe.author.avatarURL,
                    })
                    .setFields(
                        {
                            name: `{pen} Nội dung`.emoji,
                            value: snipe.content,
                        },
                        {
                            name: `{clock} Thời gian xoá`.emoji,
                            value: `${dayjs(snipe.date).format(
                                'YYYY-MM-DD HH:mm:ss'
                            )} <t:${Math.floor(snipe.date / 1000)}:R>`,
                        }
                    )
                    .setTimestamp();
                if (snipe.attachments.size) {
                    let i = 0;
                    let files = [];
                    for (const [key, value] of snipe.attachments) {
                        if (IE.includes(value.name.split('.').pop())) {
                            SnipeEmbed.setImage(value.url);
                        } else {
                            i++;
                            files.push(`${i}. [${value.name}](${value.url})`);
                        }
                    }
                    if (files.length) {
                        SnipeEmbed.addFields({
                            name: `{file} Tệp đính kèm`.emoji,
                            value: files.join('\n'),
                        });
                    }
                }
                SnipeEmbed.setFooter({
                    text: `Trang ${p}/${snipes.length}`,
                });
                message.followUp(SnipeEmbed);
            }
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
