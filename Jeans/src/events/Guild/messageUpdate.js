const MAX = 10;
const report = require('../../utils/report');
const { EmbedBuilder } = require('discord.js');
const config = require('../../config/config');
const IE = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'];
const dayjs = require('dayjs');
module.exports = {
    name: 'messageUpdate',
    run: async (client, oldMessage, newMessage) => {
        if (!newMessage.author) return;
        if (newMessage.author.bot) return;
        let esnipes = client.esnipes.get(newMessage.channel.id) || [];
        if (esnipes.length > MAX - 1) esnipes.pop();
        esnipes.unshift({
            old_content: oldMessage.content
                ? oldMessage.content.length < 200
                    ? oldMessage.content
                    : oldMessage.content.slice(0, 200) +
                      '...\n' +
                      `[[full]](${await createBin(
                          `Tin nhắn được xoá bởi ${oldMessage.author.username}`,
                          oldMessage.content
                      )})`
                : 'Không có nội dung',
            new_content: newMessage.content
                ? newMessage.content.length < 200
                    ? newMessage.content
                    : newMessage.content.slice(0, 200) +
                      '...\n' +
                      `[[full]](${await createBin(
                          `Tin nhắn được xoá bởi ${newMessage.author.username}`,
                          newMessage.content
                      )})`
                : 'Không có nội dung',
            author: {
                username: newMessage.author.username,
                avatarURL: newMessage.author.displayAvatarURL({
                    dynamic: true,
                }),
            },
            attachments: oldMessage.attachments,
            date: Date.now(),
        });
        let esnipe = esnipes[0];
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
                },
                {
                    name: `{owner} Guild`.emoji,
                    value: `${newMessage.guild.name} (${newMessage.guild.id})`,
                },
                {
                    name: `{text_channel} Channel`.emoji,
                    value: `#${newMessage.channel.name} (${newMessage.channel.id})`,
                }
            )
            .setTimestamp(esnipe.date);
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
        report.messagelog(EsnipeEmbed);
        client.esnipes.set(newMessage.channel.id, esnipes);
    },
};
