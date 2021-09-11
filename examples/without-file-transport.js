/**
 * Logger will not create file transport if one of these conditions applied:
 * - global.TEKTRANS_LOGGER_DO_NOT_USING_FILE specified
 * - process.env.TEKTRANS_LOGGER_DO_NOT_USING_FILE specified
 * - is in test unit environtment, you can override it by specifiying:
 *   global.TEKTRANS_LOGGER_USING_FILE or process.env.TEKTRANS_LOGGER_USING_FILE
 */

global.TEKTRANS_LOGGER_DO_NOT_USING_FILE = true;

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
