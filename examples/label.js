global.TEKTRANS_LOGGER_LABEL = 'MY-LABEL';

const logger = require('..');

logger.verbose('This is the most simple log');

// No log on bellow minimum loglevel.
// To set minimum loglevel, you can specify minimum log level by setting this value:
// - process.env.TEKTRANS_LOGGER_LEVEL
// - global.TEKTRANS_LOGGER_LEVEL
logger.debug('This should not be logged because minimum log level is verbose.');

logger.verbose('This is an example of log with metadata', {
    a: 'metadata1',
    b: 'metadata2',
    c: {
        c1: 'compund',
    },
});
