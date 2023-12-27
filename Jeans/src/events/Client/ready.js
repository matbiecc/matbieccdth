const colors = require('colors');
const log = require('../../utils/logger');
module.exports = {
    name: 'ready',
    isOnce: true,
    run: async (client) => {
        log.success(`${client.user.tag} is up and ready to go.`);
    },
};
