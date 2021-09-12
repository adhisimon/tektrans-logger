# ![tektrans-logger](https://raw.githubusercontent.com/tektrans/tektrans-arts/main/projects/tektrans-logger/github-tektrans-logger-social-banner-no-badges.jpg)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org)
[![WinstonJS](https://img.shields.io/badge/WINSTONJS-gray?style=for-the-badge)](https://github.com/winstonjs/winston)
[![Tektrans](https://img.shields.io/badge/TEKTRANS-maroon?style=for-the-badge)](https://tektrans.id)

[![Version npm](https://img.shields.io/npm/v/tektrans-logger.svg)](https://www.npmjs.com/package/tektrans-logger)
[![Dependency Status](https://david-dm.org/tektrans/tektrans-logger.svg?theme=shields.io)](https://david-dm.org/tektrans/tektrans-logger)

[![NPM](https://nodei.co/npm/tektrans-logger.png)](https://nodei.co/npm/tektrans-logger/)

## Overview
A wrapper of [winston](https://github.com/winstonjs/winston) logger,
replacing deprecated logger from [KOMODO-SDK](https://gitlab.kodesumber.com/komodo/komodo-sdk).

This logger should be used by [TEKTRANS](https://tektrans.id) projects.
But ofcourse you can use it too.


## Features
* Create multiple transports automatically by default:
  * Console
  * File ([DailyRotateFile](https://github.com/winstonjs/winston-daily-rotate-file))
* Not creating DailyRotateFile transport if test environment detected.
  This is the most reason we need a simple wrapper for winston logger.
* Ability to change log directory.
* Ability to change log base filename.
* [Ability to publish to redis channel](#experimental-redis-transport) ([winston-redis](https://github.com/winstonjs/winston-redis)) - **experimental**

## Future features
* Circular buffer transport.

## Install
```bash
npm i tektrans-logger
```

## Usage
Using tektrans-logger is easy.
Just include the module and you can use it with default behaviors.

```javascript
const logger = require('tektrans-logger');

logger.info('User created', {
    username: 'johndoe',
    fullename: 'John Doe',
    comment: 'who is he?',
});

logger.warn('A warn message', {
    eCode: e.code, eMessage: e.message
});
```

See [here](./examples) for more examples.

## Behaviors
You can override behavior by using environment (process.env) or global variable
or by specified in config object.
Remember to put those override statement before first call of
"require('tektrans-logger')" statement.

Here is the list:
* **TEKTRANS_LOGGER_CONFIG**: config object
* **TEKTRANS_LOGGER_LEVEL**: minimum log level to dump
  * default: "verbose. "
  * alias: LOGLEVEL
  * config property: config.level
* **TEKTRANS_LOGGER_LABEL**: log label
  * default: "" (empty string)
  * alias: KOMODO_LOG_LABEL
  * config property: config.label
* **TEKTRANS_LOGGER_DO_NOT_USING_FILE**: set it to any value to make logger without
  using file transport
  * default: null
* **TEKTRANS_LOGGER_USING_FILE**: set it to force using file transport even if it
  was called from test environtment
  * default: null
* **TEKTRANS_LOGGER_DIRECTORY**: directory to put log files
  * default: 'logs' directory on working directory
  * config property: config.directory
* **TEKTRANS_LOGGER_FILENAME**: base filename for log file
  * default: 'log'
  * alias: KOMODO_LOG_FILENAME
  * config property: config.filename
* **TEKTRANS_LOGGER_CONSOLE_LEVEL**: minimum log level to dump using Console transport
  * default: same as TEKTRANS_LOGGER_LEVEL
  * config property: config.console_level
* **TEKTRANS_LOGGER_FILE_LEVEL**: minimum log level to dump using file transport
  * default: same as TEKTRANS_LOGGER_LEVEL
  * config property: config.file_level
* **TEKTRANS_LOGGER_MAX_FILES**: maximum number of log files to keep.
  If not set, no logs will be removed. This can be a number of files or number of days.
  If using days, add 'd' as the suffix.
  See [DailyRotateFile](https://github.com/winstonjs/winston-daily-rotate-file#options)
  * default: null
  * config property: config.max_files

## Config default object
```javascript
{
  level: 'verbose',
  label: null,

  // default is "logs" directory on current workdir
  directory: path.join(process.cwd(), 'logs'),

  filename: 'log',

  // default is using generic level value
  console_level: null,

  // default is using generic level value
  file_level: null,

  // default is no old file removal
  max_files: null,
}
```

See [examples/using-config.js](./examples/using-config.js) for
usage example of using config object.

## Experimental Redis transport
Redis transport can be enabled by putting "redis" property on config object.

This config object will use default options for redis transport:
```javascript
{
  // ...
  redis: true
}
```

This will specify some property of redis transport: 
```javascript
{
  // ...
  redis: {
    level: 'verbose',
    host: 'localhost',
    port: 6379,
    auth: null,
    channel: null,
    meta: null,
  }
}
```
### Default value of Redis transport
* level: same as general level value
* host: 'localhost'
* port: 6379
* auth: null, no authentication
* channel: "TEKTRANS-LOGGER_B707E453_<LOG-LABEL-IN-UPPERCASE_IF-SPECIFIED>,".
  For example if you specify log label as "xyz", channel will be
  "TEKTRANS-LOGGER_B707E453_XYZ".
  If you don't specify log label, channel name will be
  "TEKTRANS-LOGGER_B707E453".

See [examples/redis.js](./examples/redis.js) for code example.

## Changelog
See [CHANGELOG.md](./CHANGELOG.md).

## License
Licensed under MIT License
([see this file](./LICENSE)).

Feel free to use or fork it
if you think it would be usefull for you.

Copyright [PT. TEKNOLOGI TRANSAKSI DIGITAL (TEKTRANS)](https://tektrans.id) 2021.

[![TEKTRANS](https://siasky.net/CABQGdV6AnZih995X3er5uLei05jmj9gOgnCoPV2PdnQBw)](https://tektrans.id)