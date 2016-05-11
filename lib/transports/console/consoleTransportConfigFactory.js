'use strict';

const NodeConfig = require('config');
const ConsoleTransportConfig = require('./consoleTransportConfig');

class ConsoleTransportConfigFactory {

    static createFromNodeConfig() {
        const config = {};
        if (NodeConfig.has('logger.consoleTransport.enabled')) {
            config.enabled = NodeConfig.get('logger.consoleTransport.enabled');
        }
        if (NodeConfig.has('logger.consoleTransport.level')) {
            config.level = NodeConfig.get('logger.consoleTransport.level');
        }
        if (NodeConfig.has('logger.consoleTransport.colorize')) {
            config.colorize = NodeConfig.get('logger.colorize');
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
