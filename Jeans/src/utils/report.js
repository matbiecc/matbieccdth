const { EmbedBuilder, WebhookClient, Shard } = require('discord.js');
const { Webhook, DiscordColor } = require('../config/config.js');

class Report {
    constructor() {}
    error(message, error) {
        const webhookClient = new WebhookClient({ url: Webhook.error_logs });
        const embed = new EmbedBuilder()
            .setTitle(`{error} ${message}`.emoji)
            .setDescription(error)
            .setColor('#ff5c6a')
            .setTimestamp();
        webhookClient.send({ embeds: [embed] });
    }
    server(message) {
        const webhookClient = new WebhookClient({ url: Webhook.server_logs });
        const embed = new EmbedBuilder()
            .setColor(DiscordColor)
            .setDescription(message)
            .setTimestamp();
        webhookClient.send({ embeds: [embed] });
    }
    command(commandName, commandType, shardId, guild, channel, author) {
        const webhookClient = new WebhookClient({ url: Webhook.command_logs });
        const embed = new EmbedBuilder()
            .setDescription(
                `**Command**: \`${commandName}\`\n**Type**: ${commandType}\n**Shard**: ${
                    shardId + 1
                }\n**Guild**: ${guild.name} (${guild.id})\n**Channel**: ${
                    channel ? `#${channel.name} (${channel.id})` : 'Invalid'
                }\n**Author**: ${author.username} (${author.id})`
            )
            .setColor(DiscordColor)
            .setTimestamp();
        webhookClient.send({ embeds: [embed] });
    }
    guild(guild, shardId, type) {
        (async () => {
            const webhookClient = new WebhookClient({
                url: Webhook.guild_logs,
            });
            let icon =
                'https://media.discordapp.net/attachments/1105500697073553468/1135590646242082816/9ee47b2c7f609224354ea3cfaa518d22.jpg?width=468&height=468';
            const embed = new EmbedBuilder()
                .setFields(
                    {
                        name: '{bank} Guild'.emoji,
                        value: `${guild.name} (${guild.id})`,
                    },
                    {
                        name: '{person} Members'.emoji,
                        value: `${guild.memberCount} members`,
                    },
                    {
                        name: '{owner} Owner'.emoji,
                        value: `${
                            (await guild.fetchOwner(guild.ownerId)).user
                                .username
                        } (${guild.ownerId})`,
                    },
                    {
                        name: '{online} Shard'.emoji,
                        value: `${shardId + 1}`,
                    },
                    {
                        name: '{boost} Boosts'.emoji,
                        value: `${guild.premiumSubscriptionCount} boosts`,
                    }
                )
                .setThumbnail(
                    guild.iconURL({ dynamic: true }) ||
                        'https://media.discordapp.net/attachments/1103345299658911746/1135589858786672711/gvff3.png?width=468&height=468'
                )
                .setTimestamp();
            switch (type) {
                case 'join':
                    embed.setAuthor({
                        name: 'Joined a new guild!',
                        iconURL: icon,
                    });
                    embed.setColor('#00ff00');
                    break;
                case 'leave':
                    embed.setAuthor({
                        name: 'Left a guild!',
                        iconURL: icon,
                    });
                    embed.setColor('#ff0000');
                    break;
            }
            webhookClient.send({ embeds: [embed] });
        })();
    }
    feedback(embed) {
        const webhookClient = new WebhookClient({ url: Webhook.feedback_logs });
        webhookClient.send({ embeds: [embed] });
    }
    reportAPI(embed) {
        const webhookClient = new WebhookClient({ url: Webhook.report_api });
        webhookClient.send({ embeds: [embed] });
    }
    vote(user, detail) {
        const webhookClient = new WebhookClient({ url: Webhook.vote_logs });
        const embed = new EmbedBuilder()
            .setTitle('Có lượt vote mới!')
            .setDescription(
                `**User**: ${user.username} (${user.id})${
                    detail ? `\n**Detail**: ${detail}` : ''
                }}`
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
        webhookClient.send({ embeds: [embed] });
    }
    messagelog(embed) {
        const webhookClient = new WebhookClient({ url: Webhook.message_logs });
        webhookClient.send({ embeds: [embed] });
    }
}

module.exports = new Report();
