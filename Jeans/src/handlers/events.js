const colors = require('colors');
const glob = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const log = require('../utils/logger');

module.exports = async (client) => {
    (await globPromise(`${__dirname}/../events/*/*.js`)).forEach((file) => {
        let pull = require(file);
        if (pull.name) {
            client.events.set(pull.name, pull);
            if (pull.isOnce) {
                client.once(pull.name, (...args) => pull.run(client, ...args));
            } else {
                client.on(pull.name, (...args) => pull.run(client, ...args));
                console.lg
            }
            log.handler(`EVENTS: Loaded file: ${pull.name}`);
        } else {
            log.error(
                `EVENTS: Couldn't load the file ${file}, missing module name value.`
            );
            return;
        }
    });
};
