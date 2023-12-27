const colors = require('colors');
const glob = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const log = require('../utils/logger');

module.exports = async (client, config) => {
    (await globPromise(`${__dirname}/../modals/*.js`)).forEach((file) => {
        let pull = require(file);
        if (pull.id) {
            client.modals.set(pull.id, pull);
            log.handler(`MODALS: Loaded file: ${pull.id}`);
        } else {
            log.error(
                `MODALS: Couldn't load the file ${file}, missing module name value.`
            );
            return;
        }
    });
};
