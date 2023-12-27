const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Replies with pong!',
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: 'SendMessages',
    },
    run: async ({ client, interaction, config, report, log, func }) => {
        try {
            const uptime = func.secondsToDhms(client.uptime / 1000);
            interaction
                .reply({
                    content: '**Pinging...**',
                    fetchReply: true,
                })
                .then((m) => {
                    console.log(m.createdTimestamp);
                    console.log(interaction.createdTimestamp);
                    let ping =
                        (m.createdTimestamp - interaction.createdTimestamp) /
                        1000;
                    const embed = new EmbedBuilder()
                        .setTitle('{alarm} Pong!'.emoji)
                        .setColor(config.DiscordColor)
                        .setTimestamp()
                        .addFields([
                            {
                                name: 'Độ trễ Gawwrư Gura',
                                value: `\`\`\`fix\n[ ${
                                    ping < 1
                                        ? `${
                                              m.createdTimestamp -
                                              interaction.createdTimestamp
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
                        ephemeral: true,
                    });
                });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
