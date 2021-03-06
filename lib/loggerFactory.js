'use strict';

const Winston = require('winston');
require('winston-loggly');
require('newrelic-winston');

const WinstonLoggerClass = Winston.Logger;

const Logger = require('./logger');
const LoggerConfigFactory = require('./loggerConfigFactory');

class LoggerFactory {

    /**
     * @param {LoggerConfig} config
     * @returns {Logger}
     */
    static createLogger(config) {
        const winstonLogger = Internals.initializeWinstonLogger(config);
        
        // Return the logger!
        return new Logger(winstonLogger);
    }

    /**
     * @param nodeConfig
     */
    static createLoggerFromNodeConfig(nodeConfig) {
        const loggerConfig = LoggerConfigFactory.createFromNodeConfig(nodeConfig);
        return LoggerFactory.createLogger(loggerConfig);
    }
}

class Internals {

    /**
     * @param {LoggerConfig} config
     * @returns {WinstonLoggerClass}
     */
    static initializeWinstonLogger(config) {
        // Create a new Winston Logger
        const winstonLogger = new WinstonLoggerClass({});
        winstonLogger.setLevels(Winston.config.syslog.levels);

        if (config.enabled) {
            Internals.addConsoleTransport(winstonLogger, config.consoleTransport);
            Internals.addLogglyTransport(winstonLogger, config.logglyTransport);
        }
        return winstonLogger;
    }

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

    /**
     * @param {WinstonLoggerClass} winstonLogger
     * @param {LogglyTransportConfig} config
     */
    static addLogglyTransport(winstonLogger, config) {
        if (config.enabled) {
            winstonLogger.add(Winston.transports.Loggly, {
                level: config.level,
                token: config.token,
                subdomain: config.subdomain,
                tags: config.tags,
                json:true
            });
        }
    }
}

module.exports = LoggerFactory;

