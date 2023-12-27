const { EmbedBuilder } = require('discord.js');
const zodiacData = require('../../../config/zodiac.json');
module.exports = {
    config: {
        name: 'zodiac',
        description: 'Hiện thông tin về cung hoàng đạo của bạn',
        category: 'Info',
        usage: 'zodiac [dd/mm]',
        aliases: ['cunghoangdao'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, args, prefix, config, report, log }) => {
        try {
            const day_month = args.join(' ');
            if (!day_month)
                return message.error(
                    'Vui lòng nhập ngày tháng sinh của bạn theo định dạng: dd/mm'
                );
            if (day_month.length > 5)
                return message.error(
                    'Định dạng ngày tháng không đúng, vui lòng nhập lại!'
                );

            let day = day_month.split('/')[0];
            let month = day_month.split('/')[1];
            if (!day || !month || isNaN(day) || isNaN(month)) {
                return message.error(
                    'Định dạng ngày tháng không đúng, vui lòng nhập lại!'
                );
            }
            day = parseInt(day);
            month = parseInt(month);
            if (day > 31 || day < 1 || month > 12 || month < 1) {
                return message.error(
                    'Ngày tháng không hợp lệ, vui lòng nhập lại!'
                );
            }
            let zodiac = '';
            if (month == 1) {
                if (day <= 19) {
                    zodiac = 'Ma Kết';
                } else {
                    zodiac = 'Bảo Bình';
                }
            } else if (month == 2) {
                if (day <= 18) {
                    zodiac = 'Bảo Bình';
                } else {
                    zodiac = 'Song Ngư';
                }
            } else if (month == 3) {
                if (day <= 20) {
                    zodiac = 'Song Ngư';
                } else {
                    zodiac = 'Bạch Dương';
                }
            }
            if (month == 4) {
                if (day <= 19) {
                    zodiac = 'Bạch Dương';
                } else {
                    zodiac = 'Kim Ngưu';
                }
            }
            if (month == 5) {
                if (day <= 20) {
                    zodiac = 'Kim Ngưu';
                } else {
                    zodiac = 'Song Tử';
                }
            }
            if (month == 6) {
                if (day <= 20) {
                    zodiac = 'Song Tử';
                } else {
                    zodiac = 'Cự Giải';
                }
            }
            if (month == 7) {
                if (day <= 22) {
                    zodiac = 'Cự Giải';
                } else {
                    zodiac = 'Sư Tử';
                }
            }
            if (month == 8) {
                if (day <= 22) {
                    zodiac = 'Sư Tử';
                } else {
                    zodiac = 'Xử Nữ';
                }
            }
            if (month == 9) {
                if (day <= 22) {
                    zodiac = 'Xử Nữ';
                } else {
                    zodiac = 'Thiên Bình';
                }
            }
            if (month == 10) {
                if (day <= 22) {
                    zodiac = 'Thiên Bình';
                } else {
                    zodiac = 'Bọ Cạp';
                }
            }
            if (month == 11) {
                if (day <= 21) {
                    zodiac = 'Bọ Cạp';
                } else {
                    zodiac = 'Nhân Mã';
                }
            }
            if (month == 12) {
                if (day <= 21) {
                    zodiac = 'Nhân Mã';
                } else {
                    zodiac = 'Ma Kết';
                }
            }
            const yourZodiac = zodiacData.find((e) => e.name.includes(zodiac));
            let embed = new EmbedBuilder()
                .setColor(config.DiscordColor)
                .setAuthor({
                    name: `Cung hoàng đạo của bạn là: ${zodiac}`,
                    iconURL: message.member.user.displayAvatarURL(),
                })
                .addFields(
                    {
                        name: 'Ngày tháng',
                        value: `${yourZodiac.date}`,
                        inline: false,
                    },
                    {
                        name: 'Tính cách',
                        value: `${yourZodiac.body.split('\n')[0]}`,
                        inline: false,
                    }
                )
                .setTimestamp()
                .setImage(yourZodiac.image)
                .setFooter({
                    text: `Yêu cầu bởi ${message.member.user.username}`,
                });
            yourZodiac.body
                .split('\n')
                .slice(1)
                .forEach((e) => {
                    embed.addFields({
                        name: '{down_arrow}'.emoji,
                        value: e,
                        inline: false,
                    });
                });

            message.channel.send({
                embeds: [embed],
            });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
