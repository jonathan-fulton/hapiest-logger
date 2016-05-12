'use strict';

const LoggerConfig = require('./loggerConfig');
const ConsoleTransportConfigFactory = require('./transports/console/consoleTransportConfigFactory');

class LoggerConfigFactory {

    /**
     * @param {Config} nodeConfig
     * @returns {LoggerConfig}
     */
    static createFromNodeConfig(nodeConfig) {
        const config = {};
        if (nodeConfig.has('logger.enabled')) {
            config.enabled = nodeConfig.get('logger.enabled');
        }
        if (nodeConfig.has('logger.consoleTransport')) {
            config.consoleTransport = nodeConfig.get('logger.consoleTransport');
        }

        return LoggerConfigFactory.createFromJsObj(config);
    }

    /**
     * @param {object} loggerConfig
     * @param {boolean} [loggerConfig.enabled] - defaults to false
     * @param {object} [loggerConfig.consoleTransport] - defaults to disabled transport
     * @returns {LoggerConfig}
     */
    static createFromJsObj(loggerConfig) {
        const config = {
            enabled: loggerConfig.enabled || false,
            consoleTransport: ConsoleTransportConfigFactory.createFromJsObj(loggerConfig.consoleTransport)
        };

        return new LoggerConfig(config);
    }

}

module.exports = LoggerConfigFactory;