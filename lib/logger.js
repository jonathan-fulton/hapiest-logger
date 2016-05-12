'use strict';

class Logger {

    /**
     * @param {Winston.Logger} logger - should have levels set to Winston.config.syslog.levels
     */
    constructor(logger) {
        this.logger = logger;
    }
    
    /**
     * @param {string} msg
     * @param {object} [data]
     */
    debug(msg, data) {
        _log(this.logger, this.logger.debug, msg, data);
    }

    /**
     * @param {string} msg
     * @param {object} [data]
     */
    info(msg, data) {
        _log(this.logger, this.logger.info, msg, data);
    }

    /**
     * @param {string} msg
     * @param {object} [data]
     */
    notice(msg, data) {
        _log(this.logger, this.logger.notice, msg, data);
    }

    /**
     * @param {string} msg
     * @param {object} [data]
     */
    warning(msg, data) {
        _log(this.logger, this.logger.warning, msg, data);
    }

    /**
     * @param {string} msg
     * @param {object} [data]
     */
    error(msg, data) {
        if (data && data instanceof Error) {
            data = {
                errorMessage: data.message,
                errorStack: data.stack,
                err: data
            }
        } else if (data && data.err && data.err instanceof Error) {
            data.errorMessage = data.err.errorMessage;
            data.errorStack = data.err.stack;
        }

        _log(this.logger, this.logger.error, msg, data);
    }


    /**
     * @returns {Winston.Logger}
     */
    getLogger() {
        return this.logger;
    }
}

function _log(logger, logFunction, msg, data) {
    const boundLogFunction = logFunction.bind(logger);
    if (data) {
        const wrappedData = {data: data};
        boundLogFunction(msg, wrappedData);
    } else {
        boundLogFunction(msg);
    }
}

module.exports = Logger;