'use strict';

const NodeConfig = require('config');

const LoggerConfig = require('./loggerConfig');
const ConsoleTransportConfigFactory = require('./transports/console/consoleTransportConfigFactory');

class LoggerConfigFactory {

    /**
     * @returns {LoggerConfig}
     */
    static createFromNodeConfig() {
        const config = {};
        if (NodeConfig.has('logger.enabled')) {
            config.enabled = NodeConfig.get('logger.enabled');
        }
        if (NodeConfig.has('logger.consoleTransport')) {
            config.consoleTransport = NodeConfig.get('logger.consoleTransport');
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