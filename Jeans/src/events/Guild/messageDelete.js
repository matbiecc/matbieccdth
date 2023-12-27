const MAX = 10;
const report = require('../../utils/report');
const { EmbedBuilder } = require('discord.js');
const config = require('../../config/config');
const IE = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'];
const dayjs = require('dayjs');
module.exports = {
    name: 'messageDelete',
    run: async (client, message) => {
        if (!message.author) return;
        if (message.author.bot) return;
        let snipes = client.snipes.get(message.channel.id) || [];
        if (snipes.length > MAX - 1) snipes.pop();
        snipes.unshift({
            content: message.content
                ? message.content.length < 1024
                    ? message.content
                    : message.content.slice(0, 1021) +
                      '...\n' +
                      `[[full]](${await createBin(
                          `Tin nhắn được xoá bởi ${message.author.username}`,
                          message.content
                      )})`
                : 'Không có nội dung',
            author: {
                username: message.author.username,
                avatarURL: message.author.displayAvatarURL({ dynamic: true }),
            },
            attachments: message.attachments,
            date: Date.now(),
        });
        let snipe = snipes[0];
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
                },
                {
                    name: `{owner} Guild`.emoji,
                    value: `${message.guild.name} (${message.guild.id})`,
                },
                {
                    name: `{text_channel} Channel`.emoji,
                    value: `#${message.channel.name} (${message.channel.id})`,
                }
            )
            .setTimestamp(snipe.date);
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
        report.messagelog(SnipeEmbed);
        client.snipes.set(message.channel.id, snipes);
    },
};

async function createBin(username, content) {
    const res = await create({
        title: username,
        description: 'snipe command',
        files: [
            {
                content: content,
                language: 'text',
            },
        ],
    });
    return res.url;
}
