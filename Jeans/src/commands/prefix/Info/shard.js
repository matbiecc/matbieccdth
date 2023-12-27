const { EmbedBuilder } = require('discord.js');
module.exports = {
    config: {
        name: 'shardinfo',
        description: 'Xem thông tin shard',
        category: 'Info',
        aliases: ['shard', 'shardin4'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({
        client,
        message,
        args,
        prefix,
        config,
        func,
        report,
        log,
    }) => {
        try {
            const promises = await client.shard.broadcastEval((c) => {
                return [
                    c.shard.ids[0],
                    c.guilds.cache.size,
                    c.guilds.cache.reduce(
                        (prev, guild) => prev + guild.memberCount,
                        0
                    ),
                    c.channels.cache.size,
                    c.uptime,
                    process.memoryUsage().heapUsed,
                    process.memoryUsage().heapTotal,
                    c.user.presence.status,
                    c.ws.ping,
                ];
            });
            let finable = '';
            let status;
            promises.forEach((value) => {
                status = `{${value[7]}}`.emoji;

                finable += `${status} **Shard ${parseInt(
                    value[0]
                )}**\n> {right_arrow} Guilds: **${value[1].toLocaleString()}** \n> {author} Members: **${value[2].toLocaleString()}** \n> {text_channel} Channels: **${value[3].toLocaleString()}** \n> {time} Uptime: **${func.secondsToDhms(
                    Math.floor(value[4] / 1000)
                )}** \n> {calendar} RAM: **${func.formatBytes(
                    value[5]
                )}/${func.formatBytes(value[6])}**\n> {ping} Ping: **${
                    value[8]
                }ms**  \n\n`.emoji;
            });
            const shardinfo = new EmbedBuilder()
                .setColor(config.DiscordColor)
                .setAuthor({
                    name: `${client.user.username} Shard Info`,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setTimestamp()
                .setFooter({
                    text: `Guild Shard: ${parseInt(message.guild.shardId) + 1}`,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setDescription(finable);
            return message.channel.send({
                embeds: [shardinfo],
            });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
