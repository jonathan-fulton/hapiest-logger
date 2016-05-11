'use strict';

const Should = require('should');
const interceptStdout = require('intercept-stdout');
const LoggerConfigFactory = require('../lib/loggerConfigFactory');
const LoggerFactory = require('../lib/loggerFactory');

describe('Logger', function() {

    describe('class', function() {
        it('Should have five main functions', function() {
            const logger = Internals.createConsoleLogger('debug');

            logger.debug.should.be.a.Function();
            logger.info.should.be.a.Function();
            logger.notice.should.be.a.Function();
            logger.warning.should.be.a.Function();
            logger.error.should.be.a.Function();
        });
    });

    describe('functions', function(){
        describe('debug', function() {
            it('Should log messages for a debug-level logger', function() {
                const logger = Internals.createConsoleLogger('debug');
                const logOutput = logger.debug('Debug message');
                logOutput.should.deepEqual({
                    level: 'debug',
                    message: 'Debug message'
                });
            });

            it('Should not log debug messages for info|notice|warning|error-level loggers', function() {
                Internals.runTests({
                    loggerFunction: 'debug',
                    msg: 'Info message',
                    expectedOutput: '',
                    loggerLevelsToTest: ['info', 'notice', 'warning', 'error']
                })
            });

            it('Should log data with a debug message', function() {
                Internals.runTests({
                    loggerFunction: 'debug',
                    msg: 'Debug message',
                    data: {attr1: 'test', attr2: 'something'},
                    expectedOutput: {level: 'debug', message: 'Debug message', attr1: 'test', attr2: 'something'},
                    loggerLevelsToTest: ['debug']
                })
            });
        });

        describe('info', function() {
            it('Should log messages for a debug|info-level loggers', function() {
                Internals.runTests({
                    loggerFunction: 'info',
                    msg: 'Info message',
                    data: {check: {confirm: true}},
                    expectedOutput: {level: 'info', message: 'Info message', check: {confirm: true}},
                    loggerLevelsToTest: ['debug', 'info']
                })
            });

            it('Should not log debug messages for notice|warning|error-level loggers', function() {
                Internals.runTests({
                    loggerFunction: 'info',
                    msg: 'Info message',
                    expectedOutput: '',
                    loggerLevelsToTest: ['notice', 'warning', 'error']
                })
            });
        });

        describe('notice', function() {
            it('Should log messages for a debug|info|notice-level loggers', function() {
                Internals.runTests({
                    loggerFunction: 'notice',
                    msg: 'Notice message',
                    data: {check: {confirm: true}},
                    expectedOutput: {level: 'notice', message: 'Notice message', check: {confirm: true}},
                    loggerLevelsToTest: ['debug', 'info', 'notice']
                })
            });

            it('Should not log debug messages for warning|error-level loggers', function() {
                Internals.runTests({
                    loggerFunction: 'notice',
                    msg: 'Notice message',
                    expectedOutput: '',
                    loggerLevelsToTest: ['warning', 'error']
                })
            });
        });

        describe('warning', function() {
            it('Should log messages for a debug|info|notice|warning-level loggers', function() {
                Internals.runTests({
                    loggerFunction: 'warning',
                    msg: 'warning message',
                    data: {check: {confirm: true}},
                    expectedOutput: {level: 'warning', message: 'warning message', check: {confirm: true}},
                    loggerLevelsToTest: ['debug', 'info', 'notice', 'warning']
                })
            });

            it('Should not log messages for error-level loggers', function() {
                Internals.runTests({
                    loggerFunction: 'warning',
                    msg: 'warning message',
                    expectedOutput: '',
                    loggerLevelsToTest: ['error']
                })
            });
        });

        describe('error', function() {
            it('Should log messages for a debug|info|notice|warning|error-level loggers', function() {
                Internals.runTests({
                    loggerFunction: 'error',
                    msg: 'error message',
                    data: {check: {confirm: true}},
                    expectedOutput: {level: 'error', message: 'error message', check: {confirm: true}},
                    loggerLevelsToTest: ['debug', 'info', 'notice', 'warning', 'error']
                })
            });
        });
    });

});

class Internals {

    /**
     * @param {debug|info|notice|warning|error} level
     * @return {LoggerWrapper}
     */
    static createConsoleLogger(level) {
        const loggerConfig = LoggerConfigFactory.createFromJsObj({
            enabled: true,
            consoleTransport: {
                enabled: true,
                level: level,
                colorize: true
            }
        });
        const logger = LoggerFactory.createLogger(loggerConfig);

        return new LoggerWrapper(logger);
    }

    /**
     * @param {object} config
     * @param {string} config.loggerFunction
     * @param {string} config.msg
     * @param {any} [config.data]
     * @param {any} config.expectedOutput
     * @param {string[]} config.loggerLevelsToTest
     */
    static runTests(config) {
        config.loggerLevelsToTest.forEach((level) => {
            const logger = Internals.createConsoleLogger(level);
            const loggerOutput = logger[config.loggerFunction](config.msg, config.data);
            loggerOutput.should.deepEqual(config.expectedOutput);
        });
    }
}

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