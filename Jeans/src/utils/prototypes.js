const { Message, EmbedBuilder, CommandInteraction } = require('discord.js');
const { emojis, DiscordColor } = require('../config/config.js');
module.exports = async () => {
    String.prototype.__defineGetter__('emoji', function () {
        string = this.toString();
        if (!string.match(/\{([^{}()]+)\}/g)) return string;
        string
            .match(/\{([^{}()]+)\}/g)
            .map((match) => match.replace(/[{}]/g, ''))
            .forEach((match) => {
                string = string.replace(`{${match}}`, emojis[match]);
            });
        return string;
    });
    CommandInteraction.prototype.error = async function (content, ephemeral=false) {
        return this.followUp({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`{error} ${content}`.emoji)
                    .setColor('Red'),
            ],
            ephemeral: ephemeral,
        });
    };
    CommandInteraction.prototype.success = async function (content, ephemeral=false) {
        return this.followUp({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`{success} ${content}`.emoji)
                    .setColor('Green'),
            ],
            ephemeral: ephemeral,
        });
    };
    CommandInteraction.prototype.send = async function (embed, ephemeral=false) {
        return this.followUp({
            embeds: [embed],
            ephemeral: ephemeral,
        });
    };
    Message.prototype.error = async function (content) {
        switch (content) {
            case 'no-permission':
                return this.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `{error} Bạn không có quyền để sử dụng lệnh này {sad}`
                                    .emoji
                            )
                            .setColor('Red'),
                    ],
                    allowedMentions: { repliedUser: false },
                })
                    .then((msg) => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15000);
                    })
                    .catch(() => {});
            case 'owner-only':
                return this.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `{error} Chỉ có chủ sở hữu mới có thể sử dụng lệnh này {sad}`
                                    .emoji
                            )
                            .setColor('Red'),
                    ],
                    allowedMentions: { repliedUser: false },
                })
                    .then((msg) => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15000);
                    })
                    .catch(() => {});

            case 'command-disabled':
                return this.reply({
                    embeds: [
                        new EmbedBuilder()

                            .setDescription(
                                `{error} Lệnh này đã bị tắt {sad}`.emoji
                            )
                            .setColor('Red'),
                    ],
                    allowedMentions: { repliedUser: false },
                })
                    .then((msg) => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15000);
                    })
                    .catch(() => {});
            case 'no-permission-bot':
                return this.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `{error} Bot không có quyền để sử dụng lệnh này {sad}`
                                    .emoji
                            )
                            .setColor('Red'),
                    ],
                    allowedMentions: { repliedUser: false },
                })
                    .then((msg) => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15000);
                    })
                    .catch(() => {});
            case 'no-args':
                return this.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `{error} Vui lòng nhập đúng cú pháp`
                            )
                            .setColor('Red'),
                    ],
                    allowedMentions: { repliedUser: false },
                })
                    .then((msg) => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15000);
                    })
                    .catch(() => {});
            case 'nsfw-only':
                return this.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `{error} Lệnh này chỉ có thể sử dụng trong kênh NSFW`
                            )
                            .setColor('Red'),
                    ],
                    allowedMentions: { repliedUser: false },
                })
                    .then((msg) => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15000);
                    })
                    .catch(() => {});
            default:
                return this.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`{error} ${content}`.emoji)
                            .setColor('Red'),
                    ],
                    allowedMentions: { repliedUser: false },
                })
                    .then((msg) => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15000);
                    })
                    .catch(() => {});
        }
    };
    Message.prototype.success = async function (content) {
        return this.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`{success} ${content}`.emoji)
                    .setColor('Green'),
            ],
            allowedMentions: { repliedUser: false },
        })
            .then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 15000);
            })
            .catch(() => {});
    };
    Message.prototype.followUp = async function (embed) {
        return this.reply({
            embeds: [embed],
            allowedMentions: { repliedUser: false },
        });
    };
};
