const winston = require('winston');

const consoleTransport = new (winston.transports.Console)({
    json: false,
    timestamp: true,
    stderrLevels: ['info', 'error', 'debug']
});

module.exports = new (winston.Logger)({
    transports: [consoleTransport],
    exceptionHandlers: [consoleTransport],
    exitOnError: false
});
