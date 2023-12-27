const {
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
} = require('discord.js');
module.exports = {
    config: {
        name: 'help',
        description: 'Danh sách tất cả các lệnh của bot',
        category: 'Info',
        usage: 'help [lệnh]',
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, args, prefix, config, report, log }) => {
        try {
            const commands = client.prefix_commands;
            let commandsize = 0;
            let embed = new EmbedBuilder().setColor(config.DiscordColor);
            if (!args[0]) {
                embed
                    .setAuthor({
                        name: `Danh sách tất cả các lệnh của bot`,
                        iconURL: message.client.user.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setThumbnail(
                        `https://i.pinimg.com/236x/17/14/19/171419db21a71eda67c23764a2e17205.jpg`
                    );
                let com = {};
                commands.forEach((cmd) => {
                    if (
                        !config.Users.OWNERS.includes(message.author.id) &&
                        cmd.owner
                    )
                        return;
                    if (!com[cmd.config.category])
                        com[cmd.config.category] = [];
                    com[cmd.config.category].push(cmd.config.name);
                    commandsize++;
                });

                for (const [key, value] of Object.entries(com)) {
                    let desc = '`' + value.join('`, `') + '`';
                    if (key === 'NSFW' && !message.channel.nsfw)
                        desc =
                            '`Lệnh này chỉ có thể sử dụng/hiển thị trong kênh NSFW`';
                    embed.addFields({
                        name: `<a:owner:1180750406960283668> ${key} ‹${value.length} lệnh› :`
                            .emoji,
                        value: desc,
                    });
                }
                embed
                    .setDescription(
                        `Danh sách lệnh của  **${client.user.username}**\n Prefix của server là: **${prefix}**\nTổng số lệnh: **${commandsize}**`
                    )
                    .setFooter({
                        text: `Sử dụng ${prefix}help [lệnh] để biết thêm thông tin`,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    });
                let url = new ButtonBuilder()
                    .setLabel('Server hỗ trợ')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.gg/pisceswithlove')
                    .setEmoji('869140895046451200');
                let url2 = new ButtonBuilder()
                    .setLabel('Mời bot')
                    .setStyle(ButtonStyle.Link)
                    .setURL(
                        `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`
                    )
                    .setEmoji('869140895042261023');

                const row = new ActionRowBuilder().addComponents(url, url2);
                message.channel.send({
                    embeds: [embed],
                    components: [row],
                });
                message.channel.send(
                    `\`\`\`fix\nHãy nhập lệnh ${prefix}news để cập nhật những thông báo mới nhất từ bot\`\`\``
                );
            } else {
                const commandName = args[0].toLowerCase();
                const command =
                    commands.get(commandName) ||
                    commands.find(
                        (cmd) =>
                            cmd.config.aliases &&
                            cmd.config.aliases.includes(commandName)
                    );
                if (!command) {
                    return message.console.error(
                        `Không tìm thấy lệnh **${commandName}**`
                    );
                }
                let info;
                if (command.config.name)
                    info = `**{box} | Tên lệnh**: \`${command.config.name}\``
                        .emoji;
                if (command.config.aliases)
                    info += `\n**{pen} | Viết tắt**: ${
                        command.config.aliases.join(', ') || 'Không có'
                    }`.emoji;
                if (command.config.category)
                    info += `\n**{archive} | Phân loại**: ${
                        command.config.category.replace(/<PREFIX>/g, prefix) ||
                        'Không có'
                    }`.emoji;
                if (command.config.description)
                    info += `\n**{pin} | Miêu tả**: ${
                        command.config.description.replace(
                            /<PREFIX>/g,
                            prefix
                        ) || 'Không có'
                    }`.emoji;
                if (command.config.usage) {
                    info +=
                        `\n**{forum} | Cách dùng**: \`\`\`fix\n${prefix}${command.config.usage}\`\`\``
                            .emoji;
                } else {
                    info +=
                        `\n**{forum} | Cách dùng**: \`\`\`fix\n${prefix}${command.config.name}\`\`\``
                            .emoji;
                }
                embed.setFooter({
                    text: `Cú pháp: () = bắt buộc, [] = không bắt buộc`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                });

                embed.setDescription(info);
                message.channel.send({
                    embeds: [embed],
                });
            }
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
