'use strict';

const LoggerConfig = require('./loggerConfig');
const ConsoleTransportConfigFactory = require('./transports/console/consoleTransportConfigFactory');
const LogglyTransportConfigFactory = require('./transports/loggly/logglyTransportConfigFactory');

class LoggerConfigFactory {

    /**
     * @param {Config} nodeConfig
     * @returns {LoggerConfig}
     */
    static createFromNodeConfig(nodeConfig) {
        const config = nodeConfig.has('logger') ? nodeConfig.get('logger') : {};
        return LoggerConfigFactory.createFromJsObj(config);
    }

    /**
     * @param {object} loggerConfig
     * @param {boolean} [loggerConfig.enabled] - defaults to false
     * @param {object} [loggerConfig.consoleTransport] - defaults to disabled transport
     * @param {object} [loggerConfig.logglyTransport] - defaults to disabled transport
     * @returns {LoggerConfig}
     */
    static createFromJsObj(loggerConfig) {
        const config = {
            enabled: loggerConfig.enabled || false,
            consoleTransport: ConsoleTransportConfigFactory.createFromJsObj(loggerConfig.consoleTransport || {}),
            logglyTransport: LogglyTransportConfigFactory.createFromJsObj(loggerConfig.logglyTransport || {})
        };

        return new LoggerConfig(config);
    }

}

module.exports = LoggerConfigFactory;