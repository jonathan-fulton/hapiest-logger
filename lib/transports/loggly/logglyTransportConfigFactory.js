'use strict';

const _ = require('lodash');
const LogglyTransportConfig = require('./logglyTransportConfig');

class LogglyTransportConfigFactory {

    /**
     * @param {Config} nodeConfig
     * @returns {LogglyTransportConfig}
     */
    static createFromNodeConfig(nodeConfig) {
        let config = {};
        if (nodeConfig.has('logger.logglyTransport')) {
            config = nodeConfig.get('logger.logglyTransport');
        }

        return LogglyTransportConfigFactory.createFromJsObj(config);
    }

    /**
     * @param {object} config
     * @param {boolean} config.enabled
     * @param {string} config.level
     * @param {string} config.token
     * @param {string} config.subdomain
     * @param {Array.<string>} config.tags
     * @returns {LogglyTransportConfig}
     */
    static createFromJsObj(config) {
        const defaultConfig = {
            enabled: false,
            level: 'error',
            tags: ['nodejs']
        };
        config = _.merge(defaultConfig, config);
        return new LogglyTransportConfig(config);
    }

}

module.exports = LogglyTransportConfigFactory;
