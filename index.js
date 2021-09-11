const MODULE_NAME = 'TEKTRANS-LOGGER';

const fs = require('fs');
const path = require('path');
const winston = require('winston');

require('winston-daily-rotate-file');

const isInTest = require('./lib/is-in-test');

const level = null
    || process.env.TEKTRANS_LOGGER_LEVEL
    || process.env.LOGLEVEL
    || global.TEKTRANS_LOGGER_LEVEL
    || global.LOGLEVEL
    || 'verbose';

const label = null
    || process.env.TEKTRANS_LOGGER_LABEL
    || process.env.KOMODO_LOG_LABEL
    || global.TEKTRANS_LOGGER_LABEL
    || global.KOMODO_LOG_LABEL;

const isUsingFile = !global.TEKTRANS_LOGGER_DO_NOT_USING_FILE
    && !process.env.TEKTRANS_LOGGER_DO_NOT_USING_FILE
    && (
        !isInTest
        || !!global.TEKTRANS_LOGGER_USING_FILE
        || !!process.env.TEKTRANS_LOGGER_USING_FILE
    );

const logDir = global.TEKTRANS_LOGGER_DIRECTORY || path.join(
    process.cwd(),
    '/logs',
);

const filenamePrefix = null
    || process.env.TEKTRANS_LOGGER_FILENAME
    || process.env.KOMODO_LOG_FILENAME
    || global.TEKTRANS_LOGGER_FILENAME
    || global.KOMODO_LOG_FILENAME
    || 'log';

if (isUsingFile && !fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const transports = ['Console'];

const consoleLevel = null
    || process.env.TEKTRANS_LOGGER_CONSOLE_LEVEL
    || global.TEKTRANS_LOGGER_CONSOLE_LEVEL
    || level;

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: consoleLevel,
            format: winston.format.combine(
                winston.format.metadata(),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                winston.format.label({ label, message: false }),
                winston.format.printf(
                    (info) => `${process.stdout.isTTY ? info.timestamp : ''}${info.label ? ` ${info.label}:` : ''} ${info.level}: ${info.message} ${info.metadata && Object.keys(info.metadata).length ? JSON.stringify(info.metadata) : ''}`.trim(),
                ),
            ),
        }),
    ],
});

const dailyRotateFileLevel = isUsingFile && (
    null
    || process.env.TEKTRANS_LOGGER_FILE_LEVEL
    || global.TEKTRANS_LOGGER_FILE_LEVEL
    || level
);

if (isUsingFile) {
    transports.push('DailyRotateFile');

    const transport = new winston.transports.DailyRotateFile({
        level: dailyRotateFileLevel,
        filename: `${filenamePrefix}.%DATE%`,
        dirname: logDir,
        datePattern: 'YYYY-MM-DD',
        format: winston.format.combine(
            winston.format.metadata(),
            winston.format.label({ label, message: false }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            winston.format.json(),
        ),

    });
    logger.add(transport);
}

logger.verbose(`${MODULE_NAME} AB6F996E: Initialized`, {
    level,
    label,
    isUsingFile,
    logDir,
    filenamePrefix,
    transports,
});

module.exports = logger;
