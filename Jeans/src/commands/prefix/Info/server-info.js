const { EmbedBuilder } = require('discord.js');
let boostLevels = {
    NONE: 'Level 0',
    TIER_1: 'Level 1',
    TIER_2: 'Level 2',
    TIER_3: 'Level 3',
};
module.exports = {
    config: {
        name: 'serverinfo',
        description: 'Hiển thị thông tin về máy chủ',
        category: 'Info',
        aliases: ['guild', 'server'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, args, prefix, config, report, log }) => {
        try {
            let guild;
            if (
                args[0] &&
                config.Users.OWNERS.some((ID) => message.member.id.includes(ID))
            ) {
                guild =
                    (await client.shard.fetchClientValues(`guilds.cache`))
                        .reduce((acc, val) => acc.concat(val), [])
                        .find((g) => g.id === args[0]) || message.guild;
                if (!guild) return message.error('Không tìm thấy máy chủ');
                let urls;
                if (guild.banner) {
                    let ends = guild.banner.startsWith('a_')
                        ? '.gif?size=2048'
                        : '.png?size=2048';
                    urls =
                        'https://cdn.discordapp.com/banners/' +
                        guild.id +
                        '/' +
                        guild.banner +
                        ends;
                }
                const embed = new EmbedBuilder()
                    .setTitle(`**Thông tin về __${guild.name}__**`)
                    .setColor(config.DiscordColor)
                    .setThumbnail(guild.iconURL)
                    .addFields(
                        {
                            name: '✩ Creation Date',
                            value: `<t:${Math.floor(
                                guild.createdTimestamp / 1000
                            )}:R>`,
                            inline: true,
                        },
                        {
                            name: '✩ Joined Date',
                            value: `<t:${Math.floor(
                                guild.joinedTimestamp / 1000
                            )}:R>`,
                            inline: true,
                        },
                        {
                            name: '✩ Vanity URL',
                            value: `${
                                guild.vanityURLCode
                                    ? `https://discord.gg/${guild.vanityURLCode}`
                                    : '*None*'
                            }`,
                            inline: true,
                        },
                        {
                            name: `**✩ Boost Level:**`,
                            value: `${
                                guild.premiumTier
                                    ? `${boostLevels[guild.premiumTier]}`
                                    : 'None'
                            }`,
                            inline: true,
                        },
                        {
                            name: `**✩ Emoji Count:**`,
                            value: `${guild.emojis.length}`,
                            inline: true,
                        },
                        {
                            name: `**✩ Roles Count:**`,
                            value: `${guild.roles.length}`,
                            inline: true,
                        },
                        {
                            name: `**✩ Members Count:**`,
                            value: `${guild.members.length}`,
                            inline: true,
                        },
                        {
                            name: `**✩ Channels:**`,
                            value: `${guild.channels.length}`,
                            inline: true,
                        }
                    );
                if (urls) {
                    embed.setImage(urls);
                }

                message.channel.send({
                    embeds: [embed],
                });
            } else {
                guild = message.guild;
                const roles = guild.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map((role) => role.toString());
                const members = await guild.members.fetch();
                const channels = guild.channels.cache;
                const emojis = guild.emojis.cache;
                let urls;
                if (guild.banner) {
                    let ends = guild.banner.startsWith('a_')
                        ? '.gif?size=2048'
                        : '.png?size=2048';
                    urls =
                        'https://cdn.discordapp.com/banners/' +
                        guild.id +
                        '/' +
                        guild.banner +
                        ends;
                }
                const embed = new EmbedBuilder()
                    .setTitle(`**Thông tin về __${guild.name}__**`)
                    .setColor(config.DiscordColor)
                    .setThumbnail(guild.iconURL({ dynamic: true }))
                    .addFields(
                        {
                            name: '✩ Creation Date',
                            value: `<t:${Math.floor(
                                guild.createdAt / 1000
                            )}:R>`,
                            inline: true,
                        },
                        {
                            name: '✩ Joined Date',
                            value: `<t:${Math.floor(
                                guild.joinedTimestamp / 1000
                            )}:R>`,
                            inline: true,
                        },
                        {
                            name: '✩ Vanity URL',
                            value: `${
                                guild.vanityURLCode
                                    ? `https://discord.gg/${guild.vanityURLCode}`
                                    : '*None*'
                            }`,
                            inline: true,
                        },
                        {
                            name: `**✩ Boost Level:**`,
                            value: `${
                                guild.premiumTier
                                    ? `${boostLevels[guild.premiumTier]}`
                                    : 'None'
                            }`,
                            inline: true,
                        },
                        {
                            name: `**✩ Emoji Count:**`,
                            value: `${
                                emojis.filter((e) => !e.animated).size
                            } emojis, ${
                                emojis.filter((e) => e.animated).size
                            } animated`,
                            inline: true,
                        },
                        {
                            name: `**✩ Roles Count:**`,
                            value: `${roles.length}`,
                            inline: true,
                        },
                        {
                            name: `**✩ Members Count:**`,
                            value: `${
                                members.filter((m) => !m.user.bot).size
                            } {author} and ${
                                members.filter((m) => m.user.bot).size
                            } {bot}`.emoji,
                            inline: true,
                        },
                        {
                            name: `**✩ Channels:**`,
                            value: `${
                                channels.filter((c) => c.type === 'GUILD_TEXT')
                                    .size
                            } {text_channel} and ${
                                channels.filter((c) => c.type === 'GUILD_VOICE')
                                    .size
                            } {voice_channel}`.emoji,
                            inline: true,
                        }
                    );
                if (urls) {
                    embed.setImage(urls);
                }
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
