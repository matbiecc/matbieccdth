const { EmbedBuilder } = require('discord.js');
module.exports = {
    config: {
        name: 'ping',
        description:
            'Cung cấp cho bạn thông tin về tốc độ mà Bot có thể phản hồi với bạn',
        category: 'Info',
        aliases: ['latency'],
        cooldown: 5,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, config, func, report, log }) => {
        try {
            const uptime = func.secondsToDhms(client.uptime / 1000);
            message
                .reply({
                    content: '**Pinging...**',
                    allowedMentions: { repliedUser: false },
                    fetchReply: true,
                })
                .then((m) => {
                    let ping = (m.createdAt - message.createdAt)/1000;
                    const embed = new EmbedBuilder()
                        .setTitle('{alarm} Pong!'.emoji)
                        .setColor(config.DiscordColor)
                        .setTimestamp()
                        .addFields([
                            {
                                name: 'Độ trễ Gawr Gura',
                                value: `\`\`\`fix\n[ ${
                                    ping < 1
                                        ? `${
                                              m.createdTimestamp -
                                              message.createdTimestamp
                                          }ms`
                                        : func.secondsToDhms(ping)
                                } ]\n\`\`\``,
                                inline: true,
                            },
                            {
                                name: 'Độ trễ của API',
                                value: `\`\`\`red\n[ ${Math.round(
                                    client.ws.ping
                                )}ms ]\n\`\`\``,
                                inline: true,
                            },
                            {
                                name: 'Uptime',
                                value: `\`\`\`fix\n[ ${uptime} ]\n\`\`\``,
                                inline: true,
                            },
                        ]);
                    m.edit({
                        content: null,
                        embeds: [embed],
                        allowedMentions: { repliedUser: false },
                    });
                });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
