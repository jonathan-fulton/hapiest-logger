'use strict';

const interceptStdout = require('intercept-stdout');

class LoggerWrapper {
    /**
     * @param {Logger} logger
     */
    constructor(logger) {
        this._logger = logger;
    }

    /**
     * @param msg
     * @param data
     * @returns {string|object}
     */
    debug(msg, data) {
        return this._captureOutput(this._logger.debug, msg, data);
    }

    /**
     * @param msg
     * @param data
     * @returns {string|object}
     */
    info(msg, data) {
        return this._captureOutput(this._logger.info, msg, data);
    }

    /**
     * @param msg
     * @param data
     * @returns {string|object}
     */
    notice(msg, data) {
        return this._captureOutput(this._logger.notice, msg, data);
    }

    /**
     * @param msg
     * @param data
     * @returns {string|object}
     */
    warning(msg, data) {
        return this._captureOutput(this._logger.warning, msg, data);
    }

    /**
     * @param msg
     * @param data
     * @returns {string|object}
     */
    error(msg, data) {
        return this._captureOutput(this._logger.error, msg, data);
    }

    _captureOutput(logFunction, msg, data) {
        let loggedTxt = '';
        const unhookIntercept = interceptStdout((txt) => {loggedTxt += txt;});
        logFunction.bind(this._logger)(msg, data);
        unhookIntercept();

        let objToReturn = loggedTxt;
        try {
            objToReturn = JSON.parse(loggedTxt);
        } catch(e) {} // Discard error b/c it means we couldn't parse - it's a normal string or something

        return objToReturn;
    }
}

module.exports = LoggerWrapper;