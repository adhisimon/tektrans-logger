const MODULE_NAME = 'TEKTRANS-LOGGER';

const winston = require('winston');
require('winston-daily-rotate-file');

const config = require('./lib/config');

const consoleTransport = require('./lib/transports/console');
const fileTransport = require('./lib/transports/daily-rotate-file');

const transports = ['Console'];

const logger = winston.createLogger({
    transports: [
        consoleTransport,
    ],
});

logger.debug(`${MODULE_NAME} 393BCD3C: Logger with console transport created`);

if (fileTransport) {
    logger.add(fileTransport);
    transports.push('DailyRotateFile');
    logger.debug(`${MODULE_NAME} A2646043: File transport added to logger`);
}

logger.verbose(`${MODULE_NAME} AB6F996E: Initialized`, {
    config,
    transports,
});

module.exports = logger;
