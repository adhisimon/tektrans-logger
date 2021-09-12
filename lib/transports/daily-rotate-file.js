const mkdirp = require('mkdirp');
const winston = require('winston');
require('winston-daily-rotate-file');

const config = require('../config');
const isInTest = require('../is-in-test');

const useThisTransport = !config.do_not_using_file
    && (!isInTest || !!config.using_file);

if (useThisTransport) {
    mkdirp(config.directory);

    module.exports = new winston.transports.DailyRotateFile({
        level: config.file_level,
        filename: `${config.filename}.%DATE%`,
        dirname: config.directory,
        datePattern: 'YYYY-MM-DD',
        maxFiles: config.max_files,
        createSymlink: true,
        symlinkName: `${config.filename}.current`,
        format: winston.format.combine(
            winston.format.metadata(),
            winston.format.label({ label: `${config.label || ''}[${process.pid}]`, message: false }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            winston.format.json(),
        ),
    });
} else {
    module.exports = null;
}