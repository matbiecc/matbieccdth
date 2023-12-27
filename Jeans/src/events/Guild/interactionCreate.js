const { EmbedBuilder } = require('discord.js');
const client = require('../../bot.js');
const config = require('../../config/config.js');
const report = require('../../utils/report.js');
const log = require('../../utils/logger.js');
const func = require('../../utils/functions.js');
// const { Database } = require('quickmongo');
// const db = new Database(process.env.MONGODB);
// db.connect();
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        if (interaction.isChatInputCommand()) {
            const command = client.slash_commands.get(interaction.commandName);

            if (!command) return;

            if (!interaction.guild)
                return interaction.reply({
                    content: 'This command can only be used in a server.',
                    ephemeral: true,
                });
            if (!interaction.channel && interaction.guild)
                return interaction.reply({
                    content: 'This command can only be used in a text channel.',
                    ephemeral: true,
                });
            try {
                command.run({
                    client,
                    interaction,
                    config,
                    func,
                    db,
                    report,
                    log,
                });
                report.command(
                    interaction.commandName,
                    'slash',
                    interaction.guild.shardId,
                    interaction.guild,
                    interaction.channel,
                    interaction.user
                );
            } catch (e) {
                console.error(e);
            }
        }

        if (interaction.isUserContextMenuCommand()) {
            // User:
            const command = client.user_commands.get(interaction.commandName);

            if (!command) return;

            if (!interaction.guild)
                return interaction.reply({
                    content: 'This command can only be used in a server.',
                    ephemeral: true,
                });
            if (!interaction.channel && interaction.guild)
                return interaction.reply({
                    content: 'This command can only be used in a text channel.',
                    ephemeral: true,
                });
            try {
                command.run(client, interaction, config, func);
                report.command(
                    interaction.commandName,
                    'user',
                    interaction.guild.shardId,
                    interaction.guild,
                    interaction.channel,
                    interaction.user
                );
            } catch (e) {
                console.error(e);
            }
        }

        if (interaction.isMessageContextMenuCommand()) {
            // Message:
            const command = client.message_commands.get(
                interaction.commandName
            );

            if (!command) return;

            if (!interaction.guild)
                return interaction.reply({
                    content: 'This command can only be used in a server.',
                    ephemeral: true,
                });
            if (!interaction.channel && interaction.guild)
                return interaction.reply({
                    content: 'This command can only be used in a text channel.',
                    ephemeral: true,
                });
            try {
                command.run(client, interaction, config, func);
                report.command(
                    interaction.commandName,
                    'message',
                    interaction.guild.shardId,
                    interaction.guild,
                    interaction.channel,
                    interaction.user
                );
            } catch (e) {
                console.error(e);
            }
        }

        if (interaction.isModalSubmit()) {
            // Modals:
            const modal = client.modals.get(interaction.customId);

            if (!modal) return;

            try {
                modal.run(client, interaction, config, func);
            } catch (e) {
                console.error(e);
            }
        }
    },
};
