const MODULE_NAME = 'TEKTRANS-LOGGER';

const fs = require('fs');
const path = require('path');
const winston = require('winston');

require('winston-daily-rotate-file');

const loggerConfig = (typeof global.TEKTRANS_LOGGER_CONFIG && global.TEKTRANS_LOGGER_CONFIG)
    || {
        level: 'verbose',
        label: null,
        directory: path.join(process.cwd(), 'logs'),
        filename: 'log',
        console_level: null,
        file_level: null,
        max_files: null,
    };

const isInTest = require('./lib/is-in-test');

const level = null
    || process.env.TEKTRANS_LOGGER_LEVEL
    || process.env.LOGLEVEL
    || global.TEKTRANS_LOGGER_LEVEL
    || global.LOGLEVEL
    || loggerConfig.level;

const label = process.env.TEKTRANS_LOGGER_LABEL
    || process.env.KOMODO_LOG_LABEL
    || global.TEKTRANS_LOGGER_LABEL
    || global.KOMODO_LOG_LABEL
    || loggerConfig.label;

const isUsingFile = !global.TEKTRANS_LOGGER_DO_NOT_USING_FILE
    && !process.env.TEKTRANS_LOGGER_DO_NOT_USING_FILE
    && (
        !isInTest
        || !!global.TEKTRANS_LOGGER_USING_FILE
        || !!process.env.TEKTRANS_LOGGER_USING_FILE
    );

const logDir = global.TEKTRANS_LOGGER_DIRECTORY
    || loggerConfig.directory;

const filenamePrefix = null
    || process.env.TEKTRANS_LOGGER_FILENAME
    || process.env.KOMODO_LOG_FILENAME
    || global.TEKTRANS_LOGGER_FILENAME
    || global.KOMODO_LOG_FILENAME
    || loggerConfig.filename;

const maxFiles = process.env.TEKTRANS_LOGGER_MAX_FILES
    || global.TEKTRANS_LOGGER_MAX_FILES
    || loggerConfig.max_files;

const consoleLevel = null
    || process.env.TEKTRANS_LOGGER_CONSOLE_LEVEL
    || global.TEKTRANS_LOGGER_CONSOLE_LEVEL
    || loggerConfig.console_level
    || level;

const dailyRotateFileLevel = isUsingFile && (
    null
    || process.env.TEKTRANS_LOGGER_FILE_LEVEL
    || global.TEKTRANS_LOGGER_FILE_LEVEL
    || loggerConfig.file_level
    || level
);

const transports = ['Console'];

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: consoleLevel,
            format: winston.format.combine(
                winston.format.metadata(),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                winston.format.label({
                    label: process.stdout.isTTY ? `${label || ''}[${process.pid}]` : label,
                    message: false,
                }),
                winston.format.colorize(),
                winston.format.printf(
                    (info) => [
                        process.stdout.isTTY ? info.timestamp : '',
                        info.label ? `${info.label}:` : '',
                        `${info.level}:`,
                        info.message || '',
                        info.metadata && Object.keys(info.metadata).length ? JSON.stringify(info.metadata) : '',
                    ].filter((item) => item).join(' ').trim(),
                ),
            ),
        }),
    ],
});

if (isUsingFile) {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    transports.push('DailyRotateFile');

    const transport = new winston.transports.DailyRotateFile({
        level: dailyRotateFileLevel,
        filename: `${filenamePrefix}.%DATE%`,
        dirname: logDir,
        datePattern: 'YYYY-MM-DD',
        maxFiles,
        createSymlink: true,
        symlinkName: `${filenamePrefix}.current`,
        format: winston.format.combine(
            winston.format.metadata(),
            winston.format.label({ label: `${label || ''}[${process.pid}]`, message: false }),
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
