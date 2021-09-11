const path = require('path');

// publish config object to be used by tektrans-logger
global.TEKTRANS_LOGGER_CONFIG = {
    level: 'verbose',
    label: 'USING-CONFIG',

    // default is "logs" directory on current workdir
    directory: path.join(process.cwd(), 'logs'),

    filename: 'using-config-log',

    // default is using generic level value
    console_level: null,

    // default is using generic level value
    file_level: null,

    // default is no old file removal
    max_files: '10d',
};

const logger = require('..');

logger.verbose('This is the most simple log');

// No log on bellow minimum loglevel.
// To set minimum loglevel, you can specify minimum log level by setting this value:
// - process.env.TEKTRANS_LOGGER_LEVEL
// - global.TEKTRANS_LOGGER_LEVEL
logger.silly('This should not be logged because minimum log level is verbose.');
logger.debug('This should not be logged because minimum log level is verbose.');

logger.verbose('This is an example of log with metadata', {
    a: 'metadata1',
    b: 'metadata2',
    c: {
        c1: 'compund',
    },
});

logger.http('This in a http log');
logger.info('This is an info log');
logger.warn('This is an warn log');
logger.error('This in an error');
