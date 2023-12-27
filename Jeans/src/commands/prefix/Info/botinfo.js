const { EmbedBuilder, version: djsversion } = require('discord.js');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
module.exports = {
    config: {
        name: 'botinfo',
        description: 'Số liệu thống kê chi tiết của bot',
        category: 'Info',
        aliases: ['bot'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, config, func, report, log }) => {
        try {
            let guildCount = await client.shard.fetchClientValues(
                'guilds.cache.size'
            );
            const guildManager = await client.shard.broadcastEval((c) =>
                c.guilds.cache.reduce(
                    (acc, guild) => acc + guild.memberCount,
                    0
                )
            );
            let totalSeconds = client.uptime / 1000;
            totalSeconds %= 86400;
            totalSeconds %= 3600;
            const serverStats = stripIndent`
            {huyhieu} **OS**        : ${await os.oos()}
            {huyhieu} **Cores**     : ${cpu.count()}
            {huyhieu} **CPU**       : ${cpu.model()}
            {huyhieu} **CPU Usage** : ${await cpu.usage()} %
            {huyhieu} **RAM**       : ${func.formatBytes(
                process.memoryUsage().heapTotal
            )}
            {huyhieu} **RAM Usage** : ${func.formatBytes(
                process.memoryUsage().heapUsed
            )}
        `.emoji;
            let shard = '';
            let values = await client.shard.broadcastEval((c) => {
                return [
                    c.shard.ids[0],
                    c.guilds.cache.size,
                    c.guilds.cache.reduce(
                        (acc, guild) => acc + guild.memberCount,
                        0
                    ),
                    c.uptime,
                    c.user.presence.status,
                    c.ws.ping,
                ];
            });
            values.forEach((value) => {
                let status;
                switch (value[4]) {
                    case 'online':
                        status = '<a:Online_1:764893134886273046>';
                        break;
                    case 'dnd':
                        status = '<a:DND_1:764893086814961665>';
                        break;
                    case 'idle':
                        status = '<a:Idle_1:764893219393372190>';
                        break;
                    case 'offline':
                        status = '<a:Offline_1:764893180537077780>';
                        break;
                }
                shard += `${status} Shard **${value[0] + 1}** ${
                    message.guild.shardId === value[0]
                        ? '<a:dotred:796061986017247302>'
                        : ''
                }:\n<:dotcom:784637625318375435> **${value[1].toLocaleString()}** servers & **${value[2].toLocaleString()}** users, uptime: **${func.secondsToDhms(
                    value[3] / 1000
                )}**, Ping: **${value[5]}** ms\n`;
            });
            let embed = new EmbedBuilder()
                .setColor(config.DiscordColor)
                .setThumbnail(client.user.displayAvatarURL())
                .setAuthor({
                    name: `Các thông tin về ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL(),
                })
                .setDescription(
                    `Hii, chào các bạn mình là **${
                        client.user.username
                    }** và tôi đang phục vụ **${func.laysodep(
                        guildCount.reduce((a, b) => a + b, 0)
                    )}** servers <a:Heart:766678613944565761>
 Đây là một số thông tin về mình <:shy:795616465591336961>`
                )
                .setFooter({
                    text: `❤️ From ${client.user.username} with love`,
                })
                .addFields({
                    name: 'Được tạo vào: ',
                    value: `<t:${Math.floor(
                        client.user.createdTimestamp / 1000
                    )}:R>`,
                    inline: true,
                })
                .addFields({
                    name: 'Hiện có:',
                    value: `${client.prefix_commands.size} lệnh`,
                    inline: true,
                })
                //  .addField("Hoạt động:", `${status} - ${uptime}`)
                .addFields({
                    name: 'Tổng số shard:',
                    value: shard,
                })
                //.addField("Trạng thái:",  client.presence.activities[0].name, true)
                .addFields({
                    name: 'Tổng số người dùng:',
                    value: `${func.laysodep(
                        guildManager.reduce((a, b) => a + b, 0)
                    )}`,
                    inline: true,
                })
                .addFields({
                    name: 'Phiên bản Discord.js:',
                    value: `v${djsversion}`,
                    inline: true,
                })
                .addFields({
                    name: 'Server:',
                    value: `${serverStats}`,
                });
            message.channel.send({ embeds: [embed] });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
