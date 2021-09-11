/* global describe it */

const path = require('path');

global.TEKTRANS_LOGGER_DIRECTORY = path.join(__dirname, 'logs');

require('should');
const fs = require('fs');
require('..');

describe('#logger', () => {
    it('should not making log dir', () => {
        fs.existsSync(global.TEKTRANS_LOGGER_DIRECTORY).should.be.false('#1D89F25B');
    });
});
