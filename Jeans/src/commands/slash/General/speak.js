const { EmbedBuilder, PermissionsBitField, Embed } = require('discord.js');
const googleTTS = require('google-tts-api');
const {
    joinVoiceChannel,
    createAudioPlayer,
    AudioPlayerStatus,
    NoSubscriberBehavior,
    createAudioResource,
} = require('@discordjs/voice');
const ms = require('ms');
const Languages = require('../../../config/languages.json');
module.exports = {
    name: 'speak',
    description: 'Text to speech',
    type: 1,
    options: [
        {
            name: 'content',
            description: 'Enter your content',
            required: true,
            type: 3,
        },
        {
            name: 'lang',
            description:
                'Change another language, default language is vietnamese',
            required: false,
            type: 3,
        },
    ],
    permissions: {
        DEFAULT_PERMISSIONS: '', // Client permissions needed
        DEFAULT_MEMBER_PERMISSIONS: '', // User permissions needed
    },
    run: async ({ client, interaction, config, db, report, log }) => {
        try {
            await interaction.deferReply();
            let content = interaction.options.getString('content');
            let lang = interaction.options.getString('lang') || 'vi';
            lang = Languages[lang] ? lang : 'vi';
            await db.set(`tts.${interaction.guild.id}.speaking`, false);
            if (
                (await db.get(`tts.${interaction.guild.id}.speaking`)) === true
            ) {
                return interaction.error(
                    `Tớ đang đọc một cái gì đó rồi🥱!, hãy thử lại sau`
                );
            }
            /*if (args.length > 15) {
                return interaction.error(
                    'Tớ chỉ có thể đọc được tối đa **15** từ thui!'
                );
            }
            if (content.length > 200 || content.length < 1) {
                return interaction.error(
                    'Tớ chỉ có thể đọc được từ `1-200` kí tự thuii!'
                );
            }*/
            let voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel)
                return interaction.error(
                    'Bạn phải ở trong voice channel mới có thể sử dụng lệnh này!'
                );
            const botPermission = voiceChannel.permissionsFor(client.user);
            if (!botPermission.has(PermissionsBitField.Flags.Connect))
                return interaction.error(
                    'Tớ không có quyền vào voice channel này!'
                );
            if (!botPermission.has(PermissionsBitField.Flags.Speak))
                return interaction.error(
                    'Tớ không có quyền nói trong voice channel này!'
                );
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
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
            await db.set(`tts.${interaction.guild.id}.speaking`, true);
            await db.set(
                `tts.${interaction.guild.id}.endtime`,
                Date.now() + ms('5m')
            );
            player.play(res);
            connection.subscribe(player);
            client.player = player;
            await interaction.send(
                new EmbedBuilder()
                    .setColor(config.DiscordColor)
                    .setDescription(`{mic} **Đang đọc nè~**`.emoji),
                true
            );
            player.on(AudioPlayerStatus.Idle, async () => {
                url.shift();
                if (url.length > 0) {
                    const res = createAudioResource(url[0].url);
                    player.play(res);
                    connection.subscribe(player);
                    await db.set(`tts.${interaction.guild.id}.speaking`, true);
                    await db.set(
                        `tts.${interaction.guild.id}.endtime`,
                        Date.now() + ms('5m')
                    );
                } else {
                    await db.set(`tts.${interaction.guild.id}.speaking`, false);
                    setTimeout(async () => {
                        let endtimes = await db.get(
                            `tts.${interaction.guild.id}.endtime`
                        );
                        if (endtimes && Date.now() > endtimes && connection) {
                            connection.disconnect();
                            interaction.success(
                                'Tớ đã rời kênh vì không có ai sử dụng nữa nữa!'
                            );
                            await db.delete(
                                `tts.${interaction.guild.id}.endtime`
                            );
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
