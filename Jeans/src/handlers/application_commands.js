const client = require('../bot.js');
const { PermissionsBitField } = require('discord.js');
const colors = require('colors');
const glob = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const log = require('../utils/logger');

module.exports = async (client, config) => {
    let commands = [];

    // Slash commands handler:
    (await globPromise(`${__dirname}/../commands/slash/*/*.js`)).forEach(
        (file) => {
            let pull = require(file);

            if ((pull.name, pull.description, pull.type == 1)) {
                client.slash_commands.set(pull.name, pull);
                log.handler(
                    `SLASH: Loaded file: ${pull.name} (#${client.slash_commands.size})`
                );

                commands.push({
                    name: pull.name,
                    description: pull.description,
                    type: pull.type || 1,
                    options: pull.options ? pull.options : null,
                    default_permission: pull.permissions.DEFAULT_PERMISSIONS
                        ? pull.permissions.DEFAULT_PERMISSIONS
                        : null,
                    default_member_permissions: pull.permissions
                        .DEFAULT_MEMBER_PERMISSIONS
                        ? PermissionsBitField.resolve(
                              pull.permissions.DEFAULT_MEMBER_PERMISSIONS
                          ).toString()
                        : null,
                });
            } else {
                log.error(
                    `Slash: Couldn't load the file ${file}, missing module name value, description, or type isn't 1.`
                );
                return;
            }
        }
    );

    // User commands handler:
    (await globPromise(`${__dirname}/../commands/user/*/*.js`)).forEach(
        (file) => {
            let pull = require(file);

            if ((pull.name, pull.type == 2)) {
                client.user_commands.set(pull.name, pull);
                log.handler(
                    `USER: Loaded file: ${pull.name} (#${client.user_commands.size})`
                );

                commands.push({
                    name: pull.name,
                    type: pull.type || 2,
                });
            } else {
                log.error(
                    `USER: Couldn't load the file ${file}, missing module name value, or type isn't 2.`
                );
                return;
            }
        }
    );

    // Message commands handler:
    (await globPromise(`${__dirname}/../commands/message/*/*.js`)).forEach(
        (file) => {
            let pull = require(file);

            if ((pull.name, pull.type == 3)) {
                client.message_commands.set(pull.name, pull);
                log.handler(
                    `MESSAGE: Loaded file: ${pull.name} (#${client.message_commands.size})`
                );

                commands.push({
                    name: pull.name,
                    type: pull.type || 3,
                });
            } else {
                log.error(
                    `MESSAGE: Couldn't load the file ${file}, missing module name value, or type isn't 3.`
                );
                return;
            }
        }
    );
};
