const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const random = require('random');
module.exports = {
    config: {
        name: 'love',
        description: '100% love!',
        category: 'Fun',
        aliases: ['love'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ message, args, config, db, report, log }) => {
        try {
            return message.error('Lệnh này đã bị vô hiệu hóa!');
            if (message.mentions.members.size > 2) {
                return message.error('Bạn chỉ có thể ship 2 người!');
            }
            let user1 =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]);
            let user2 =
                message.mentions.members.size > 1
                    ? message.mentions.members.last()
                    : null || message.guild.members.cache.get(args[1]);
            if (!user1) {
                return message.error(
                    'Hãy tag ai đó hoặc tag 2 người để ship với nhau!'
                );
            }
            if (user1 && !user2) {
                user2 = user1;
                user1 = message.guild.members.cache.get(message.author.id);
            }
            if (user1.id === user2.id) {
                return message.error('Bạn không thể ship với chính mình!');
            }
            let loading = await message.followUp(
                new EmbedBuilder()
                    .setColor(config.DiscordColor)
                    .setDescription(
                        '{loading_heart} **Đang đo mức độ thân thiết...**'.emoji
                    )
            );
            var user1Name = `${user1.user.username}`;
            var user2Name = `${user2.user.username}`;
            let min = 1;
            let max = 100;
            let rand = max;

            const canvas = createCanvas(700, 400);
            const ctx = canvas.getContext('2d');

            // Create background
            const blurBackground = await loadImage(
                path.join(
                    __dirname,
                    '../../../assets/images/blur_background.png'
                )
            );
            ctx.drawImage(blurBackground, 0, 0, canvas.width, canvas.height);

            let UI = await loadImage(
                path.join(__dirname, '../../../assets/images/ship.png')
            );

            ctx.drawImage(UI, 0, 0, canvas.width, canvas.height);

            // Stroke style
            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Font size user 1
            let fontSize = 70;
            do {
                ctx.font = `${(fontSize -= 10)}px sans-serif`;
            } while (ctx.measureText(user1Name).width > canvas.width - 300);

            ctx.fillStyle = '#ff97b5';
            var size1 = 5;
            var size2 = 5;

            // Draw name user1
            do {
                ctx.font = `${(size1 -= 5)}bold 20px sans-serif`;
            } while (ctx.measureText(user1Name).width > canvas.width - 255);
            ctx.textAlign = 'right';
            ctx.fillText(user1Name, 230, 285);

            // Draw name user 2
            do {
                ctx.font = `${(size2 -= 5)}bold 20px sans-serif`;
            } while (ctx.measureText(user2Name).width > canvas.width - 255);
            ctx.textAlign = 'left';
            ctx.fillText(user2Name, 460, 80);

            // Draw phan tram
            ctx.fillStyle = '#FFFFFF';
            var phantram = `${rand}%`;
            do {
                ctx.font = `28px sans-serif`;
            } while (ctx.measureText(user2Name).width > canvas.width - 255);
            ctx.textAlign = 'center';
            ctx.fillText(phantram, 345, 190);

            // Draw avatar
            const user1Avatar = await loadImage(
                'https://cdn.discordapp.com/avatars/' +
                    user1.id +
                    '/' +
                    user1.user.avatar +
                    '.png?size=2048'
            );

            ctx.drawImage(user1Avatar, 119, 100, 150, 150);
            
            const user2Avatar = await loadImage(
                user2.user.avatar != null
                    ? 'https://cdn.discordapp.com/avatars/' +
                          user2.id +
                          '/' +
                          user2.user.avatar +
                          '.png?size=2048'
                    : user2.user.displayAvatarURL({
                          format: 'png',
                          dynamic: true,
                          size: 2048,
                      })
            );

            ctx.drawImage(user2Avatar, 417, 100, 150, 150);

            const attachment = new AttachmentBuilder()
                .setFile(canvas.toBuffer())
                .setName('ship.png');
            let description = '';
            if (rand >= 90) {
                description = `**Mức độ**: Định mệnh 🥰`;
            } else if (rand >= 70) {
                description = `**Mức độ**: Bạn tri kỉ 🥹`;
            } else if (rand >= 60) {
                description = `**Mức độ**: Đôi bạn thân 🤩`;
            } else if (rand >= 30) {
                description = `**Mức độ**: Bạn bè 😎`;
            } else if (rand >= 10) {
                description = `**Mức độ**: Người lạ 🤔`;
            } else if (rand >= 0) {
                description = `**Mức độ**: ...🥹`;
            }
            loading.delete();
            const embed = new EmbedBuilder()
                .setColor(config.DiscordColor)
                .setTitle(`${user1.user.username} và ${user2.user.username}`)
                .setImage('attachment://ship.png')
                .setDescription(description);
            message.reply({
                embeds: [embed],
                files: [attachment],
                allowedMentions: {
                    repliedUser: false,
                },
            });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
