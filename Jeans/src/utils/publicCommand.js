const config = require('../config/config.js');
const { Routes, REST, User } = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const colors = require('colors');
const glob = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const log = require('../utils/logger');

async function PublicCommand() {
    let commands = [];

    // Slash commands handler:
    (await globPromise(`${__dirname}/../commands/slash/*/*.js`)).forEach(
        (file) => {
            let pull = require(file);

            if ((pull.name, pull.description, pull.type == 1)) {
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
    // Registering all the application commands:
    if (!config.Client.ID) {
        log.error(`You need to provide your bot ID in config.js!`.red + `\n`);
        return process.exit();
    }

    const rest = new REST({ version: '10' }).setToken(
        config.Client.TOKEN || process.env.botTOKEN
    );

    (async () => {
        log.handler(`Started registering all the application commands.`);

        try {
            await rest.put(Routes.applicationCommands(config.Client.ID), {
                body: commands,
            });

            log.handler(
                `Successfully registered all the application commands.`
            );
        } catch (err) {
            console.log(err);
        }
    })();
}
module.exports = { PublicCommand };
