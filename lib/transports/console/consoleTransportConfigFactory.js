'use strict';

const _ = require('lodash');
const ConsoleTransportConfig = require('./consoleTransportConfig');

class ConsoleTransportConfigFactory {

    /**
     * @param {Config} nodeConfig
     */
    static createFromNodeConfig(nodeConfig) {
        let config = {};
        if (nodeConfig.has('logger.consoleTransport')) {
            config = nodeConfig.get('logger.consoleTransport');
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
        const defaultValues = {
            enabled: false,
            level: 'error',
            colorize: false
        };
        config = _.merge(defaultValues, config);

        return new ConsoleTransportConfig(config);
    }
    
}

module.exports = ConsoleTransportConfigFactory;
