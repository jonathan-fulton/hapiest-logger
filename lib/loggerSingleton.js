'use strict';

const LoggerFactory = require('./loggerFactory');
const LoggerConfigFactory = require('./loggerConfigFactory');

let _logger = null;

function initLogger() {
    const loggerConfig = LoggerConfigFactory.createFromNodeConfig();
    _logger = LoggerFactory.createLogger(loggerConfig);
}

module.exports = {

    /**
     * @returns {Logger}
     */
    getLogger: function() {
        if (!_logger) {
            initLogger();
        }
        return _logger;
    }

};
