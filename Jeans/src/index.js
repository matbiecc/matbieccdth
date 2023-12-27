require('dotenv').config();
const { ShardingManager, PermissionsBitField } = require('discord.js');
const config = require('./config/config');

const manager = new ShardingManager('./src/bot.js', {
    token: process.env.botTOKEN,
    totalShards: config.Client.SHARD_COUNT,
});
const { PublicCommand } = require('./utils/publicCommand.js');

manager.on('shardCreate', (shard) =>
    console.log(
        `0-------------| Launched shard ${shard.id} |-------------0`.blue
    )
);

manager.spawn();
// PublicCommand();
