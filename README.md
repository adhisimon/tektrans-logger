# tektrans-logger

## Overview
A wrapper of [winston](https://github.com/winstonjs/winston) logger.

This logger should be used by [TEKTRANS](https://tektrans.id) projects,
replacing [KOMODO-SDK](https://gitlab.kodesumber.com/komodo/komodo-sdk) logger.

## Features
* Create paralel transports:
  * Console
  * DailyRotateFile
* Not creating DailyRotateFile transport if test environtment detected.
  This is the most reason we need a simple wrapper for winston logger.
* Ability to change log directory.
* Ability to change log base filename.

## Install
```
npm i tektrans-logger
```

## Usages
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