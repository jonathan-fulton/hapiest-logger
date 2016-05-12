'use strict';

const LoggerFactory = require('./loggerFactory');
const LoggerConfigFactory = require('./loggerConfigFactory');

let _logger = null;

/**
 * @param {Config} nodeConfig
 */
function initLogger(nodeConfig) {
    const loggerConfig = LoggerConfigFactory.createFromNodeConfig(nodeConfig);
    _logger = LoggerFactory.createLogger(loggerConfig);
}

module.exports = {

    /**
     * @param {Config} [nodeConfig]
     * @returns {Logger}
     */
    getLogger: function(nodeConfig) {
        if (!nodeConfig) {
            nodeConfig = require('config')
        }
        if (!_logger) {
            initLogger(nodeConfig);
        }
        return _logger;
    }

};
