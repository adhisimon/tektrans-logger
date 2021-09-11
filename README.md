# tektrans-logger

[![Version npm](https://img.shields.io/npm/v/tektrans-logger.svg?style=for-the-badge)](https://www.npmjs.com/package/tektrans-logger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org)
[![NodeJS](https://img.shields.io/badge/WINSTON-gray?style=for-the-badge)](https://github.com/winstonjs/winston)
[![NodeJS](https://img.shields.io/badge/TEKTRANS-maroon?style=for-the-badge)](https://tektrans.id)


## Overview
A wrapper of [winston](https://github.com/winstonjs/winston) logger.

This logger should be used by [TEKTRANS](https://tektrans.id) projects,
replacing [KOMODO-SDK](https://gitlab.kodesumber.com/komodo/komodo-sdk) logger.

## Features
* Create multiple transports automatically:
  * Console
  * File ([DailyRotateFile](https://github.com/winstonjs/winston-daily-rotate-file))
* Not creating DailyRotateFile transport if test environment detected.
  This is the most reason we need a simple wrapper for winston logger.
* Ability to change log directory.
* Ability to change log base filename.

## Install
```
npm i tektrans-logger
```

## Usage
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

## Override a behavior
You can overried behavior by using environment (process.env) or global variable.
Remember to put those override statement before any "require('tektrans-logger')"
statement.

Here is the list:
* TEKTRANS_LOGGER_LEVEL: minimum log level to dump
  * default: "verbose. "
  * alias: LOGLEVEL
* TEKTRANS_LOGGER_LABEL: log label
  * default: null (nothing)
  * alias: KOMODO_LOG_LABEL
* TEKTRANS_LOGGER_DO_NOT_USING_FILE: set it to any value to make logger without
  using file transport
  * default: null
* TEKTRANS_LOGGER_USING_FILE: set it to force using file transport even if it
  was called from test environtment
  * default: null
* TEKTRANS_LOGGER_DIRECTORY: directory to put log files
  * default: 'logs' directory on working directory
* TEKTRANS_LOGGER_FILENAME: base filename for log file
  * default: 'log'
  * alias: KOMODO_LOG_FILENAME
* TEKTRANS_LOGGER_CONSOLE_LEVEL: minimum log level to dump using Console transport
  * default: same as TEKTRANS_LOGGER_LEVEL
* TEKTRANS_LOGGER_FILE_LEVEL: minimum log level to dump using file transport
  * default: same as TEKTRANS_LOGGER_LEVEL

## Changelog
See [CHANGELOG.md](./CHANGELOG.md).

## License
Licensed under MIT License. So, feel free to use it if you think it would be
usefull for you.

Copyright [PT. TEKNOLOGI TRANSAKSI DIGITAL (TEKTRANS)](https://tektrans.id) 2021.
