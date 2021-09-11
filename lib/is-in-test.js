const isInTest = (typeof global.it) === 'function';

module.exports = isInTest;
