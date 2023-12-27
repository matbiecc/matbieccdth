const {
    EmbedBuilder,
    PermissionsBitField,
    codeBlock,
    Collection,
    Message,
} = require('discord.js');
const config = require('../../config/config.js');
const func = require('../../utils/functions.js');
const report = require('../../utils/report.js');
const cooldowns = new Collection();
const log = require('../../utils/logger.js');
// const { Database } = require('quickmongo');
// const db = new Database(process.env.MONGODB);
// db.connect();
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    name: 'messageCreate',
    run: async (client, message) => {
        if (message.channel.type !== 0) return;
        if (message.author.bot) return;

        // ============== AFK ==============
        const authorAfk = await db.get(
            `afk_${message.author.id}_${message.guild.id}`
        );
        const mentioned = message.mentions.members.first();
        if (mentioned) {
            const afkData = await db.get(
                `afk_${mentioned.id}_${message.guild.id}`
            );
            if (afkData) {
                let status = afkData.status;
                let time = afkData.time;
                message.reply({
                    content: `**${
                        mentioned.user.tag
                    }** đang AFk với lý do ${status} trong **<t:${Math.floor(
                        time / 1000
                    )}:R>**`,
                });
            }
        }
        if (authorAfk) {
            await db.delete(`afk_${message.author.id}_${message.guild.id}`);
            if (
                message.guild.members.me.permissions.has(
                    PermissionsBitField.resolve('ManageNicknames' || [])
                )
            ) {
                message.member
                    .setNickname(
                        `${message.member.displayName.replace('[AFK]', '')}`
                    )
                    .catch((e) => {
                        if (e.message == 'Mising Permisson') return;
                    });
            }
            message.reply({
                content: `**${message.author.username}** đã bỏ AFK!`,
                allowedMentions: { repliedUser: false },
            });
            if (message.content.toLowerCase().startsWith('afk')) return;
        }

        // ============== Prefix ==============

        const defaultPrefix = config.Prefix;
        const escapeRegex = (str) =>
            str.replace(/[.<>`•√π÷×¶∆£¢€¥*@_+?^${}()|[\]\\]/g, '\\$&');
        const prefixRegex = new RegExp(
            `^(<@!?${config.Client.ID}>|${escapeRegex(defaultPrefix)})\\s*`
        );
        if (!prefixRegex.test(message.content.toLowerCase())) return;
        const [, prefix] = message.content.toLowerCase().match(prefixRegex);

        if (!message.content.startsWith(prefix)) return;
        if (!message.guild) return;
        if (!message.member)
            message.member = await message.guild.fetchMember(message);

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if (cmd.length == 0) return;

        let command = client.prefix_commands.get(cmd);

        if (!command)
            command = client.prefix_commands.get(client.aliases.get(cmd));

        if (command) {
            /*//============= Toggle command =============
            const disabledList =
                (await db.get(`disabled.${message.channel.id}`)) || [];
            if (disabledList.includes(command.config.name)) return;*/

            /*============= Cooldown =============*/
            if (!cooldowns.has(command.name))
                cooldowns.set(command.name, new Collection());
            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.config.cooldown || 3) * 1000;
            if (
                timestamps.has(message.author.id) // &&
                //!config.Users.OWNERS.includes(message.author.id)
            ) {
                const expirationTime =
                    timestamps.get(message.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message
                        .reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(
                                        `**⏱ Bạn chỉ có thể sử dụng lệnh này sau **<t:${Math.floor(
                                            expirationTime / 1000
                                        )}:R>`
                                    )
                                    .setColor(config.DiscordColor),
                            ],
                            allowedMentions: { repliedUser: false },
                        })
                        .then((msg) => {
                            if (msg)
                                setTimeout(() => msg.delete(), timeLeft * 1000);
                        });
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(
                () => timestamps.delete(message.author.id),
                cooldownAmount
            );

            /*============= Command Run =============
            const blacklistData = await bot.getBlacklistData();
            if (blacklistData.users.includes(message.author.id)) return;
            if (blacklistData.guilds.includes(message.guild.id)) return;*/
            if (
                !message.guild.members.me
                    .permissionsIn(message.channel)
                    .has(PermissionsBitField.resolve(['SendMessages'] || []))
            )
                // Check if bot can send message
                return;
            // Check user permission
            if (command.permissions) {
                if (
                    !message.member.permissions.has(
                        PermissionsBitField.resolve(command.permissions || [])
                    )
                )
                    return message.error(
                        `Bạn không có quyền \`${command.permissions.join(
                            ' '
                        )}\` để thực hiện lệnh này!`
                    );
            }
            // Check bot permission
            if (command.botPermissions) {
                if (
                    !message.guild.members.me.permissions.has(
                        PermissionsBitField.resolve(
                            command.botPermissions || []
                        )
                    )
                )
                    return;
            }
            // Check owner
            if ((command.owner, command.owner == true)) {
                if (config.Users?.OWNERS) {
                    if (
                        !config.Users.OWNERS.some((ID) =>
                            message.member.id.includes(ID)
                        )
                    )
                        return message.error('owner-only');
                }
            }
            // check if nsfw
            if (command.nsfw && !message.channel.nsfw)
                return message.error('nsfw-only');
            // Check disabled
            if (command.disable) return message.error('command-disabled');
            try {
                report.command(
                    command.config.name,
                    'prefix',
                    message.guild.shardId,
                    message.guild,
                    message.channel,
                    message.author
                );
                command.run({
                    client,
                    message,
                    args,
                    prefix,
                    config,
                    func,
                    db,
                    report,
                    log,
                });
            } catch (error) {
                message.error('Có lỗi xảy ra, vui lòng thử lại sau!');
                report.error(error.message, error.stack);
            }
        }
    },
};
