const { EmbedBuilder } = require('discord.js');
const vaildImages = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
const report = require('../../../utils/report');
module.exports = {
    config: {
        name: 'feedback',
        description: 'Gửi phản hồi cho chúng mình (đính kèm ảnh nếu có)',
        category: 'Info',
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ message, args, config, reprot, log }) => {
        try {
            const content = args.join(' ');
            if (!content)
                return message.error('Vui lòng nhập nội dung phản hồi!');
            if (content.length > 1000)
                return message.error(
                    'Nội dung phản hồi không được quá 1000 ký tự!'
                );
            const embed = new EmbedBuilder()
                .setDescription(content)
                .setAuthor({
                    name: `Có feedback mới nè!`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                })
                .setFooter({
                    text: `${message.author.username} (${message.author.id})`,
                })
                .setColor(config.DiscordColor)
                .setTimestamp();
            if (message.attachments.size > 0) {
                const image = message.attachments.first().url;
                const imageType = image.split('.').pop();
                if (!vaildImages.includes(imageType))
                    return message.error(
                        'Định dạng ảnh không hợp lệ! (png, jpg, jpeg, gif, webp)'
                    );
                embed.setImage(image);
            }
            report.feedback(embed);
            return message.success(
                'Phản hồi của bạn đã được gửi đến nhóm hỗ trợ!'
            );
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
