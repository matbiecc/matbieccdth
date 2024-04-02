require("dotenv").config();
const {
  Client,
  Collection,
  MessageAttachment,
} = require("discord.js-selfbot-v13");
const {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  AudioPlayerStatus,
  getVoiceConnection,
} = require("@discordjs/voice");
const client = new Client();
const {
  PREFIX,
  nhay,
  spam,
  time_delay,
  chui,
  motchu,
  reo,
} = require("./config");
const { join } = require("node:path");
const random = require("random");
// Colection
client.spam = new Collection();
client.speaking = false;
client.player = {};
client.copy = new Collection();
client.autores = new Collection();

// Client
client.on("ready", async () => {
  console.log(`｡:💖・｡･ﾟ\n*.ﾟ｡\n･💠.💜ﾟ.\n🍏｡:*･.💛\n\n❤.｡;｡🍓.:*🍇.ﾟ\n🍊｡\n:*｡_💠👝｡_\n💮*･_ﾟ👛\n＼ξ　＼　 ζ／\n∧🎀∧＼ ξ\n（*･ω･ )/\ Pinky!\nc/　 \n∀o♥\nしー-Ｊ${client.user.username} is ready! ✅`);
});

client.on("messageCreate", async (message) => {
  try {
    if (
      client.copy.get(message.channel.id) &&
      client.copy.get(message.channel.id) === message.author.id &&
      message.content
    ) {
      message.channel.send(`${message.content}`);
    }
    if (client.autores.get(message.content)) {
      message.channel.send(client.autores.get(message.content));
    }

    if (message.author.id !== client.user.id) return;
    if (!message.content.startsWith(PREFIX)) return;
    const [...args] = message.content.slice(PREFIX.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    await message.delete();

    if (cmd === "spam") {
      stopSpam(message.channel.id);
      // Random spam message
      let spamMessage = spam[random.int(0, spam.length - 1)];
      message.channel.send(spamMessage);
      const spamInterval = setInterval(async () => {
        spamMessage = spam[random.int(0, spam.length - 1)];
        await message.channel.send(spamMessage);
      }, time_delay);
      client.spam.set(message.channel.id, spamInterval);
      console.log(`[SPAM] start spam ${message.channel.name}`);
    } else if (cmd === "stop") {
      stopSpam(message.channel.id);
      console.log(`[SPAM] stop spam ${message.channel.name}`);
    } else if (cmd === "nhay") {
      stopSpam(message.channel.id);

      // Random nhay message
      let nhayMessage = nhay[random.int(0, nhay.length - 1)];
      message.channel.send(nhayMessage);
      const nhayInterval = setInterval(async () => {
        nhayMessage = nhay[random.int(0, nhay.length - 1)];
        await message.channel.send(nhayMessage);
      }, time_delay);
      client.spam.set(message.channel.id, nhayInterval);
      console.log(`[NHAY] start nhay ${message.channel.name}`);
    } else if (cmd === "join") {
      // check if user is in voice channel
      if (!message.member.voice.channel) return;
      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      speakingAudio(connection);
      client.speaking = true;
      console.log(
        `[SPEAK] start speaking ${message.member.voice.channel.name} (${message.member.voice.channel.id})`
      );
    } else if (cmd === "dung") {
      // check if user is in voice channel
      if (!message.member.voice.channel) return;
      client.player.stop();
      client.speaking = false;
      console.log(
        `[SPEAK] stop speaking ${message.member.voice.channel.name} (${message.member.voice.channel.id})`
      );
    } else if (cmd === "leave") {
      // check if user is in voice channel
      if (!message.member.voice.channel) return;
      const connection = getVoiceConnection(message.guild.id);
      client.player.stop();
      client.speaking = false;
      connection.destroy();
      console.log(
        `[SPEAK] leave speaking ${message.member.voice.channel.name} (${message.member.voice.channel.id})`
      );
    } else if (cmd === "chui") {
      const target =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]);
      if (!target) return;
      stopSpam(message.channel.id);

      // Random message
      let chuiMessage =
        chui[random.int(0, chui.length - 1)] + " " + `<@${target.id}>`;
      message.channel.send(chuiMessage);
      const chuiInterval = setInterval(async () => {
        chuiMessage =
          chui[random.int(0, chui.length - 1)] + " " + `<@${target.id}>`;
        await message.channel.send(chuiMessage);
      }, time_delay);
      client.spam.set(message.channel.id, chuiInterval);
      console.log(`[CHUI] start chui ${message.channel.name}`);
    } else if (cmd === "motchu") {
      stopSpam(message.channel.id);

      // Random message
      let motchuMessage = motchu[random.int(0, motchu.length - 1)];
      message.channel.send(motchuMessage);
      const motchuInterval = setInterval(async () => {
        motchuMessage = motchu[random.int(0, motchu.length - 1)];
        await message.channel.send(motchuMessage);
      }, time_delay);
      client.spam.set(message.channel.id, motchuInterval);
      console.log(`[MOTCHU] start motchu ${message.channel.name}`);
    } else if (cmd === "reo") {
      const target = args[0];
      if (!target) return;
      stopSpam(message.channel.id);

      // Random message
      let reoMessage = reo[random.int(0, reo.length - 1)];
      message.channel.send(reoMessage.replace(/{target}/g, target));
      const reoInterval = setInterval(async () => {
        reoMessage = reo[random.int(0, reo.length - 1)];
        await message.channel.send(reoMessage.replace(/{target}/g, target));
      }, time_delay);
      client.spam.set(message.channel.id, reoInterval);
      console.log(`[CHUI] start chui ${message.channel.name}`);
    } else if (cmd === "help") {
      message.channel.send(
        `## Commands WarBot <a:emoji_28:1208201863154110534>\n**<a:hsmoke:1208200701818306600> Prefix : -**\n\n** - <a:khappy:1208200742708449381> ${PREFIX}spam : spam tin nhắn\n- <a:khappy:1208200742708449381> ${PREFIX}nhay : nhây\n- <a:khappy:1208200742708449381> ${PREFIX}stop : dừng tất cả spam tin nhắn\n- <a:khappy:1208200742708449381> ${PREFIX}join : spam voice\n- <a:khappy:1208200742708449381> ${PREFIX}dung: dừng spam voice\n- <a:khappy:1208200742708449381> ${PREFIX}leave : rời voice\n- <a:khappy:1208200742708449381> ${PREFIX}chui @user : chửi ai đó\n- <a:khappy:1208200742708449381> ${PREFIX}motchu : spam một chữ\n- <a:khappy:1208200742708449381> ${PREFIX}reo (tên) : réo tên ai đó\n- <a:khappy:1208200742708449381> ${PREFIX}reset : Restarting all\n- <a:khakhappyppy:1208200742708449381> ${PREFIX}help : danh sach lenh\n<a:khakhappyppy:1208200742708449381> ${PREFIX}copy @user : copy tin nhắn người bị user\n<a:khakhappyppy:1208200742708449381> ${PREFIX}ping : ping pong...\n<a:khakhappyppy:1208200742708449381> ${PREFIX}avatar : ping ảnh img\n<a:khakhappyppy:1208200742708449381> ${PREFIX}autores add : add 1ar\n<a:khakhappyppy:1208200742708449381> ${PREFIX}autores remove : remove 1ar\n\n<a:sadboy:1208200622156021800> **__THANK YOU FOR US !__** \ <a:sadboy:1208200622156021800>

 ** `
      );
    } else if (cmd === "reset") {
      client.spam.forEach((interval) => {
        clearInterval(interval);
      });
      client.spam.clear();
      client.copy.clear();
      message.channel.send(`Reset spam all`);
      console.log(`[RESET] stop spam all`);
    } else if (cmd === "ping") {
      const m = await message.channel.send("Pinging...");
      // random from 50 to 200
      const rand = random.int(50, 200);
      m.edit(`Pong! ${rand}ms`);
    } else if (cmd === "copy") {
      const target =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]);
      if (!target) return;
      stopSpam(message.channel.id);
      client.copy.set(message.channel.id, target.id);
    } else if (cmd === "av") {
      const target =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]);
      if (!target) return;
      // Check if bot is spamming
      message.channel.send(target.displayAvatarURL({ dynamic: true }));
    } else if (cmd === "ar") {
      const subcmd = args.shift().toLowerCase();
      if (!subcmd) return;
      if (subcmd === "add") {
        const content = args[0];
        if (!content) return;
        const res = args.slice(1).join(" ");
        if (!res) return;
        client.autores.set(content, res);
        message.channel.send(`Added **${content}** _${res}_`);
      } else if (subcmd === "remove") {
        const content = args[0];
        if (!content) return;
        client.autores.delete(content);
        message.channel.send(`Removed **${content}**`);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

function stopSpam(channelId) {
  if (client.spam.get(channelId)) {
    clearInterval(client.spam.get(channelId));
    client.spam.delete(channelId);
  }
  if (client.copy.get(channelId)) {
    client.copy.delete(channelId);
  }
}

function speakingAudio(connection) {
  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  });
  const resource = createAudioResource(join(__dirname, "voice.mp3"), {
    inlineVolume: true,
  });
  resource.volume.setVolume(1);
  player.play(resource);
  connection.subscribe(player);
  client.player = player;
  player.on(AudioPlayerStatus.Playing, () => {
    console.log(`[SPEAK] start speaking [${connection.joinConfig.channelId}]`);
  });
  player.on(AudioPlayerStatus.Idle, async () => {
    console.log(`[SPEAK] stop speaking [${connection.joinConfig.channelId}]`);
    if (client.speaking) speakingAudio(connection);
  });
}

client.login(process.env.TOKEN);
