const chalk = require('chalk');
const dayjs = require('dayjs');
class Logger {
    constructor() {}
    error(message, error) {
        console.log(
            `${chalk.red(
                `[ERROR + ${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`
            )} ${message}`
        );
        if (error) console.error(error);
    }
    warn(message) {
        console.log(
            `${chalk.yellow(
                `[WARN + ${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`
            )} ${message}`
        );
    }
    success(message) {
        console.log(
            `${chalk.green(
                `[SUCCESS + ${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`
            )} ${message}`
        );
    }
    info(message) {
        console.log(
            `${chalk.blue(
                `[INFO + ${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`
            )} ${message}`
        );
    }
    handler(message) {
        console.log(
            `${chalk.cyanBright(
                `[HANDLER + ${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`
            )} ${message}`
        );
    }
}

module.exports = new Logger();
