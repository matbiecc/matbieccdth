const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const googleTTS = require('google-tts-api');
const {
    joinVoiceChannel,
    createAudioPlayer,
    AudioPlayerStatus,
    NoSubscriberBehavior,
    createAudioResource,
} = require('@discordjs/voice');
const ms = require('ms');
module.exports = {
    config: {
        name: 'speak',
        description: 'Text to speech',
        category: 'Text to speech',
        aliases: ['s'],
        usage: 'speak (content)',
        cooldown: 3,
    },
    permissions: [
        'SendMessages',
        PermissionsBitField.Flags.Connect,
        PermissionsBitField.Flags.Speak,
    ],
    owner: false,
    run: async ({ client, message, args, prefix, db, report, log }) => {
        try {
            if (['877025619022606397'].includes(message.author.id)) {
                message.reply({
                    content: `\`\`\`ansi\n[0;37mchị [0;47m[1;35mLinh[0;37m tốt bụng, đáng yêu, xinh gái acp em với ạ, em biết lỗi rồi 🥹🥹\n\n[0;30m # acp để tắt thông báo này\`\`\``,
                    allowedMentions: { repliedUser: false },
                });
            }
            let lang = 'vi';
            let content = args.join(' ');
            if (!content) {
                return message.error(
                    `Bạn phải nhập nội dung thì tớ mới đọc được chứ 🥹!\n**Cú pháp**: \`${prefix}speak (nội dung)\``
                );
            }
            await db.set(`tts.${message.guild.id}.speaking`, false);
            if ((await db.get(`tts.${message.guild.id}.speaking`)) === true) {
                return message.error(
                    `Tớ đang đọc một cái gì đó rồi🥱!, hãy thử lại sau`
                );
            }
            /*if (args.length > 15) {
                return message.error(
                    'Tớ chỉ có thể đọc được tối đa **15** từ thui!'
                );
            }
            if (content.length > 200 || content.length < 1) {
                return message.error(
                    'Tớ chỉ có thể đọc được từ `1-200` kí tự thuii!'
                );
            }*/
            let voiceChannel = message.member.voice.channel;
            if (!voiceChannel)
                return message.error(
                    'Bạn phải ở trong voice channel mới có thể sử dụng lệnh này!'
                );
            const botPermission = voiceChannel.permissionsFor(client.user);
            if (!botPermission.has(PermissionsBitField.Flags.Connect))
                return message.error(
                    'Tớ không có quyền vào voice channel này!'
                );
            if (!botPermission.has(PermissionsBitField.Flags.Speak))
                return message.error(
                    'Tớ không có quyền nói trong voice channel này!'
                );
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
                selfDeaf: true,
            });
            let url = googleTTS.getAllAudioUrls(content.toString(), {
                lang: lang,
                slow: false,
                host: 'https://translate.google.com',
            });
            const player = createAudioPlayer({
                behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
            });

            const res = createAudioResource(url[0].url);
            await db.set(`tts.${message.guild.id}.speaking`, true);
            await db.set(
                `tts.${message.guild.id}.endtime`,
                Date.now() + ms('5m')
            );
            player.play(res);
            connection.subscribe(player);
            client.player = player;
            player.on(AudioPlayerStatus.Idle, async () => {
                url.shift();
                if (url.length > 0) {
                    const res = createAudioResource(url[0].url);
                    player.play(res);
                    connection.subscribe(player);
                    await db.set(`tts.${message.guild.id}.speaking`, true);
                    await db.set(
                        `tts.${message.guild.id}.endtime`,
                        Date.now() + ms('5m')
                    );
                } else {
                    await db.set(`tts.${message.guild.id}.speaking`, false);
                    setTimeout(async () => {
                        let endtimes = await db.get(
                            `tts.${message.guild.id}.endtime`
                        );
                        if (endtimes && Date.now() > endtimes && connection) {
                            connection.disconnect();
                            message.success(
                                'Tớ đã rời kênh vì không có ai sử dụng nữa nữa!'
                            );
                            await db.delete(`tts.${message.guild.id}.endtime`);
                        }
                    }, ms('5m') + 1000);
                }
            });
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
