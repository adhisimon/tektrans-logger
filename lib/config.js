const path = require('path');

/**
 * Default value of general minimum log level to dump
 * @default
 */
const DEFAULT_LEVEL = 'verbose';

/**
 * Default value of log label
 * @default
 */
const DEFAULT_LABEL = '';

/**
 * Default value of do not using file flag
 * @default
 */
const DEFAULT_DO_NOT_USING_FILE = false;

/**
 * Default value of using file flag
 * @default
 */
const DEFAULT_USING_FILE = true;

/**
 * Default value of directory where to put log files
 * @default
 */
const DEFAULT_DIRECTORY = path.join(process.cwd(), 'logs');

/**
 * Default value of base filename of log files
 * @default
 */
const DEFAULT_FILENAME = 'log';

/**
 * Default value of minimum log level to dump to console
 * @default
 */
const DEFAULT_CONSOLE_LEVEL = null;

/**
 * Default value of minimum log level to dump to file
 * @default
 */
const DEFAULT_FILE_LEVEL = null;

/**
 * Default value of number of log files to keep
 * @default
 */
const DEFAULT_MAX_FILES = null;

/**
 * RedisConfig object
 *
 * @typedef RedisConfigObject
 * @type {object}
 * @property {string} level - minimum log level to dump on redis channel
 * @property {string} label - log label
 * @property {string} host - redis host
 * @property {number} port - redis port
 * @property {string} channel - channel name to publish
 */

/**
 * Config object
 *
 * @typedef ConfigObject
 * @type {object}
 * @property {string} level - general minimum log level to dump
 * @property {string} label - log label
 * @property {string} directory - directory where to put log files
 * @property {string} filename - base filename of log files
 * @property {string} console_level - minimum log level to dump to console
 * @property {string} file_level - minimum log level to dump to file
 * @property {boolean} do_not_using_file - do not using file flag
 * @property {boolean} using_file - using file flag
 * @property {number} max_files - number of log files to keep
 * @property {RedisConfigObject} redis - redis config object
 */

/**
 * @type {ConfigObject}
 */
const config = JSON.parse(
    JSON.stringify(
        (typeof global.TEKTRANS_LOGGER_CONFIG && global.TEKTRANS_LOGGER_CONFIG) || {},
    ),
);

config.level = process.env.TEKTRANS_LOGGER_LEVEL
    || global.TEKTRANS_LOGGER_LEVEL
    || config.level
    || DEFAULT_LEVEL;

config.label = process.env.TEKTRANS_LOGGER_LABEL
    || process.env.KOMODO_LOG_LABEL
    || global.TEKTRANS_LOGGER_LABEL
    || global.KOMODO_LOG_LABEL
    || config.label
    || DEFAULT_LABEL;

config.directory = global.TEKTRANS_LOGGER_DIRECTORY
    || process.env.TEKTRANS_LOGGER_DIRECTORY
    || config.directory
    || DEFAULT_DIRECTORY;

config.filename = process.env.TEKTRANS_LOGGER_FILENAME
    || process.env.KOMODO_LOG_FILENAME
    || global.TEKTRANS_LOGGER_FILENAME
    || global.KOMODO_LOG_FILENAME
    || config.filename
    || DEFAULT_FILENAME;

config.console_level = process.env.TEKTRANS_LOGGER_CONSOLE_LEVEL
    || global.TEKTRANS_LOGGER_CONSOLE_LEVEL
    || config.console_level
    || DEFAULT_CONSOLE_LEVEL
    || config.level;

config.file_level = process.env.TEKTRANS_LOGGER_FILE_LEVEL
    || global.TEKTRANS_LOGGER_FILE_LEVEL
    || config.file_level
    || DEFAULT_FILE_LEVEL
    || config.level;

config.max_files = Number(process.env.TEKTRANS_LOGGER_MAX_FILES || global.TEKTRANS_LOGGER_MAX_FILES)
    || config.max_files
    || DEFAULT_MAX_FILES;

config.do_not_using_file = !!(process.env.TEKTRANS_LOGGER_DO_NOT_USING_FILE
    || global.TEKTRANS_LOGGER_DO_NOT_USING_FILE
    || config.do_not_using_file
    || DEFAULT_DO_NOT_USING_FILE);

config.using_file = !!(process.env.TEKTRANS_LOGGER_USING_FILE
    || global.TEKTRANS_LOGGER_USING_FILE
    || config.using_file
    || DEFAULT_USING_FILE);

module.exports = config;
