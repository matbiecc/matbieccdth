const colors = require('colors');
const glob = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const log = require('../utils/logger');

module.exports = async (client, config) => {
    (await globPromise(`${__dirname}/../commands/prefix/*/*.js`)).forEach(
        (file) => {
            let pull = require(file);
            if (pull.config.name) {
                client.prefix_commands.set(pull.config.name, pull);
                if (pull.config.aliases) {
                    pull.config.aliases.forEach((alias) => {
                        client.aliases.set(alias, pull.config.name);
                    });
                }
                log.handler(
                    `PREFIX: Loaded file: ${pull.config.name} (#${client.prefix_commands.size})`
                );
            } else {
                log.error(
                    `Couldn't load the file ${file}, missing module name value.`
                );
                return;
            }
        }
    );
};
