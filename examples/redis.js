const path = require('path');

// publish config object to be used by tektrans-logger
global.TEKTRANS_LOGGER_CONFIG = {
    level: 'silly',
    label: 'REDIS-EXAMPLE',

    // default is "logs" directory on current workdir
    directory: path.join(process.cwd(), 'logs'),

    filename: 'redis-log',

    // default is using generic level value
    console_level: null,

    // default is using generic level value
    file_level: null,

    // default is no old file removal
    max_files: '10d',

    redis: {
        host: 'localhost',
        port: 6379,
        auth: null,
        channel: null,
    },
};

const logger = require('..');

const sleep = (ms) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, ms);
});

const main = async () => {
    // await sleep(2000);

    logger.silly('This is a silly log.');
    logger.debug('This is a debug log.');
    logger.verbose('This is a verbose log');

    logger.verbose('This is a verbose example of log with metadata', {
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

    // give few seconds to make sure all logs
    // has been emitted to redis before close the log
    await sleep(2000);

    // don't forget to close the logger at the end
    logger.end();
};

main();
