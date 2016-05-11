'use strict';

const Winston = require('winston');
require('winston-loggly');
require('newrelic-winston');
require('winston-raygun');

const WinstonLoggerClass = Winston.Logger;

const Logger = require('./logger');

class LoggerFactory {

    /**
     * @param {LoggerConfig} config
     * @returns {Logger}
     */
    static createLogger(config) {
        // Create a new Winston Logger
        const winstonLogger = new WinstonLoggerClass({});
        winstonLogger.setLevels(Winston.config.syslog.levels);

        if (config.enabled) {
            Internals.addConsoleTransport(winstonLogger, config.consoleTransport);
        }

        
        // Return the logger!
        return new Logger(winstonLogger);
    }
}

class Internals {

    /**
     * @param {WinstonLoggerClass} winstonLogger
     * @param {ConsoleTransportConfig} config
     */
    static addConsoleTransport(winstonLogger, config) {
        if (config.enabled) {
            winstonLogger.add(Winston.transports.Console, {
                level: config.level,
                colorize: config.colorize,
                prettyPrint: true,
                depth: 3,
                json: true
            });
        }
    }
}

module.exports = LoggerFactory;

