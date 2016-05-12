'use strict';

const ConsoleTransportConfig = require('./consoleTransportConfig');

class ConsoleTransportConfigFactory {

    /**
     * @param {Config} nodeConfig
     */
    static createFromNodeConfig(nodeConfig) {
        const config = {};
        if (nodeConfig.has('logger.consoleTransport.enabled')) {
            config.enabled = nodeConfig.get('logger.consoleTransport.enabled');
        }
        if (nodeConfig.has('logger.consoleTransport.level')) {
            config.level = nodeConfig.get('logger.consoleTransport.level');
        }
        if (nodeConfig.has('logger.consoleTransport.colorize')) {
            config.colorize = nodeConfig.get('logger.colorize');
        }

        return ConsoleTransportConfigFactory.createFromJsObj(config);
    }

    /**
     * @param {object} config
     * @param {boolean} [config.enabled]
     * @param {string} [config.level]
     * @param {boolean} [config.colorize]
     */
    static createFromJsObj(config) {
        if(!config) {
            config = {};
        }
        if(!config.enabled) {
            config.enabled = false;
        }
        if(!config.level) {
            config.level = 'error';
        }
        if(!config.colorize) {
            config.colorize = false;
        }

        return new ConsoleTransportConfig(config);
    }
    
}

module.exports = ConsoleTransportConfigFactory;
