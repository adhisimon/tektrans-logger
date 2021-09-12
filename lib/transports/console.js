const winston = require('winston');
const config = require('../config');

module.exports = new winston.transports.Console({
    level: config.console_level,
    format: winston.format.combine(
        winston.format.metadata(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.label({
            label: config.label,
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
});
