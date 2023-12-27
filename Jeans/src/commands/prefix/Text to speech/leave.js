const { getVoiceConnection } = require('@discordjs/voice');
module.exports = {
    config: {
        name: 'leave',
        description: 'Leave voice channel   ',
        category: 'Text to speech',
        aliases: ['stop'],
        cooldown: 3,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ client, message, db, report, log }) => {
        try {
            const voiceChannel = message.member.voice.channel;
            const botChannel = message.guild.members.me.voice.channel;
            if (!voiceChannel) {
                return message.error('Bạn phải vào voice channel trước!');
            }
            if (!botChannel) {
                return message.error('Tớ không ở trong voice channel!');
            }
            if (voiceChannel.id !== botChannel.id) {
                return message.error('Bạn phải vào cùng voice channel với tớ!');
            }
            const connection = getVoiceConnection(message.guild.id);
            connection.destroy();
            return message.success('Đã rời khỏi voice channel!');
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};
