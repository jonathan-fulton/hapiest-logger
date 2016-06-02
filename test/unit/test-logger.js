'use strict';

const Should = require('should');
const Path = require('path');
const NodeConfig = require('config-uncached');
const LoggerConfigFactory = require('../../lib/loggerConfigFactory');
const LoggerFactory = require('../../lib/loggerFactory');
const LoggerWrapper = require('../unit-helper/loggerFactory/loggerWrapper');

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
                    expectedOutput: {level: 'debug', message: 'Debug message', data:{attr1: 'test', attr2: 'something'}},
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
                    expectedOutput: {level: 'info', message: 'Info message', data:{check: {confirm: true}}},
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
                    expectedOutput: {level: 'notice', message: 'Notice message', data:{check: {confirm: true}}},
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
                    expectedOutput: {level: 'warning', message: 'warning message', data:{check: {confirm: true}}},
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
                    expectedOutput: {level: 'error', message: 'error message', data:{check: {confirm: true}}},
                    loggerLevelsToTest: ['debug', 'info', 'notice', 'warning', 'error']
                })
            });
        });
    });

    describe('Loggly Transport', function() {

        it('Should log messages to Loggly', function(done) {
            const logger = Internals.createLogglyLogger();
            logger.info('Sending this message to Loggly!');
            setTimeout(done,1000); // Need the timeout so it gets to Loggly
        });

    })

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

    static createLogglyLogger() {
        const configDir = Path.resolve(__dirname, '../unit-helper/logger/logglyTransport');
        process.env.NODE_CONFIG_DIR = configDir;
        return LoggerFactory.createLoggerFromNodeConfig(NodeConfig(true));
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