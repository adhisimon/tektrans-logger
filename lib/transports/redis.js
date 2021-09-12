const WinstonRedis = require('winston-redis');

const config = require('../config');

const DEFAULT_REDIS_HOST = 'localhost';
const DEFAULT_REDIS_PORT = 6379;
const DEFAULT_REDIS_AUTH = null;

const DEFAULT_REDIS_CHANNEL = [
    'TEKTRANS-LOGGER',
    'B707E453',
    (config.label || '').toUpperCase(),
].filter((item) => item).join('_');

if (!config.redis) {
    module.exports = null;
} else {
    if (typeof config.redis !== 'object') {
        config.redis = {};
    }

    config.redis.level = config.redis.level || config.level;
    config.redis.host = config.redis.host || DEFAULT_REDIS_HOST;
    config.redis.port = config.redis.port || DEFAULT_REDIS_PORT;
    config.redis.auth = config.redis.auth || DEFAULT_REDIS_AUTH;
    config.redis.channel = config.redis.channel || DEFAULT_REDIS_CHANNEL;

    const transport = new WinstonRedis({
        level: config.redis.level,
        host: config.redis.host,
        port: config.redis.port,
        auth: config.redis.auth,
        channel: config.redis.channel,
    });

    module.exports = transport;
}
