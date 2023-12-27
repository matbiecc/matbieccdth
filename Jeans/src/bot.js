require('dotenv').config();
const {
    Client,
    Partials,
    Collection,
    GatewayIntentBits,
} = require('discord.js');
const config = require('./config/config');
const report = require('./utils/report');

// Creating a new client:
const client = new Client({
    intents: Object.keys(GatewayIntentBits).map((a) => {
        return GatewayIntentBits[a];
    }),
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction,
    ],
    presence: {
        activities: [
            {
                name: 'Gawr Gura',
                type: 0,
            },
        ],
        status: 'dnd',
    },
});

// Getting the bot token:
const AuthenticationToken = process.env.botTOKEN;
if (!AuthenticationToken) {
    console.warn(
        '[CRASH] Authentication Token for Discord bot is required! Use Envrionment Secrets or config.js.'
            .red
    );
    return process.exit();
}

// Handler:
client.prefix_commands = new Collection();
client.aliases = new Collection();
client.slash_commands = new Collection();
client.user_commands = new Collection();
client.message_commands = new Collection();
client.modals = new Collection();
client.events = new Collection();
client.player = {};
client.snipes = new Collection();
client.esnipes = new Collection();

require('./utils/prototypes.js')();

module.exports = client;
['prefix', 'application_commands', 'modals', 'events'].forEach((file) => {
    require(`./handlers/${file}`)(client, config);
});

// Login to the bot:
client.login(AuthenticationToken).catch((err) => {
    console.error(
        '[CRASH] Something went wrong while connecting to your bot...'
    );
    console.error('[CRASH] Error from Discord API:' + err);
    report.error('Error from Discord API', err);
    return process.exit();
});

// Handle errors:
process.on('unhandledRejection', async (err, promise) => {
    if (err.message && err.message.includes('Unknown Message')) return;
    if (err.message && err.message.includes('Missing Permissions'))
        return console.error(`[ANTI-CRASH] ${err.message}`.red);
    console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
    console.error(promise);
    report.error('Unhandled Rejection', err.stack);
});
