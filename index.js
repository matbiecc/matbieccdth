const { Client } = require("discord.js-selfbot-v13");
const config = require("./config.json");
const client = new Client({ checkUpdate: false });
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, NoSubscriberBehavior, AudioPlayerStatus } = require("@discordjs/voice");
const ffmpeg = require("fluent-ffmpeg");
require('colors');

//SETTING 
const PREFIX = "t"
let thoigianguitinnhan = 5000

// ngôn
const nhay = [
    `mẹ m thằng ngu ` ,
    `cặc ba m cay lắm rồi con chó`,
    `tức ỉa ra cụt cứt đen xì như mặt mẹ m v đó`,  
    `sao dạ cắn tao hả thằng ngu` ,
    `sút m cay té con cặc mà`,
    `té lửa đi em`, 
    `phát khóc r à` ,
    `cay phát khóc như mẹ m đang bị chửi`,
    `hăng lên con`,   
    `úi chậm r kìa m tốc độ lên đi` ,
    `mấy thằng như m là 1 nhát thôi`,
    `m bị thất sủng bị tụi nó đá mà`,
    `cay phải gọi là ói dòi ôi` ,
    `tức rồi kìa ảnh tức r`,
    `nổi máu dân phèn hả thằng ngu`,  
    `bày đặt thể hiện đẳng cấp xạo lồn kìa` ,
    `tía lia như con mẹ m v`,
    `câm chưa thằng ngu`, 
    `ẳng nhiều m có mài ra ăn được k` ,
    `mà xạo lồn ngồi bóc phét v ta`,
    `ê ê m sủa tốc độ à con chó ngâu`, 
    `m cay lắm r hả` ,
    `tức người kia`,
    `ẹc ẹc sủa nhanh`, ]
//
const spam = [
    `NHa Phuang Hin ` ,
    `www`,
    `wwwwwww`,  ] 
///
const ownerID = "id" 

/// các lệnh
const a = "spam" ///spam 
const b = "stop" ////dừng spam và  nhây 
const c = "nhay"  //nhây
const d = "xa" ///join voice và xã
const e = "out" // out voice dừng xã

client.on('ready', () => {
    // Thiết lập activity cho bot thành null để tắt hoặc không hiển thị activity
    client.user.setActivity(null);
    console.log('Bot đã sẵn sàng và hoạt động.');
});

// Khởi tạo client.intervals
client.intervals = new Map();

// Xử lý sự kiện "message"
client.on('messageCreate', async (message) => {
    // Kiểm tra xem tin nhắn có phải từ chính bot hoặc từ owner không
    if (message.author.id !== client.user.id && message.author.id !== ownerID) return;

    // Kiểm tra xem tin nhắn có bắt đầu bằng prefix không
    if (!message.content.startsWith(PREFIX)) return;

    // Tách lệnh và tham số từ tin nhắn
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Xử lý các lệnh
    if (command === a) { // Lệnh spam
        // Loại bỏ setInterval nếu đã tồn tại
        client.intervals.has(message.channel.id) && clearInterval(client.intervals.get(message.channel.id));

        // Lặp để gửi tin nhắn spam
        let spamMessage = spam[Math.floor(Math.random() * spam.length)];
        message.channel.send(spamMessage);
        const interval = setInterval(async () => {
            spamMessage = spam[Math.floor(Math.random() * spam.length)];
            await message.channel.send(spamMessage);
        }, thoigianguitinnhan);
        client.intervals.set(message.channel.id, interval);
    } else if (command === b) { // Lệnh dừng spam và nhây
        client.intervals.has(message.channel.id) && clearInterval(client.intervals.get(message.channel.id));
    } else if (command === c) { // Lệnh nhây
        let mention = message.author.username;
        if (message.mentions.members.first()) {
            mention = message.mentions.members.first().user.id;
        }
        const interval = setInterval(async () => {
            let msg = `${nhay[Math.floor(Math.random() * nhay.length)]}`;
            await message.channel.send(msg);
        }, thoigianguitinnhan);
        client.intervals.set(message.channel.id, interval);
    } else if (command === d) { // Lệnh join voice và xã
        if (!args[0]) return message.reply('Vui lòng nhập id kênh, ví dụ: t xa + id channel');
        const channelId = args[0];
        const channel = client.channels.cache.get(channelId);
        if (!channel) return message.channel.send('Không tìm thấy kênh này!');
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false
        });
        const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
        let resource = createAudioResource('./8.mp3', { inlineVolume: true, inlineBoost: true });
        resource.volume?.setVolume(0.5);
        player.play(resource);
        player.on(AudioPlayerStatus.Idle, () => {
            resource = createAudioResource('./8.mp3', { inlineVolume: true, inlineBoost: true });
            resource.volume?.setVolume(0.5);
            player.play(resource);
        });
        connection.subscribe(player);
    } else if (command === e) { // Lệnh out voice dừng xã
        const connection = getVoiceConnection(message.guild.id);
        connection && connection.destroy();
    }
});


// Không in ra thông báo của config
// console.log("Config:", config);

// Sử dụng token từ config để đăng nhập
client.login(config.DISCORD_TOKEN);