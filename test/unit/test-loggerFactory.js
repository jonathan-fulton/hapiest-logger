'use strict';

const Should = require('should');
const Path = require('path');
const NodeConfig = require('config-uncached');
const Logger = require('../../lib/logger');
const LoggerFactory = require('../../lib/loggerFactory');
const LoggerWrapper = require('../unit-helper/loggerFactory/loggerWrapper');

describe('LoggerFactory', function() {
    describe('createLoggerFromNodeConfig', function() {

        it('Should create an info-level console logger ', function() {

            const configDir = Path.resolve(__dirname, '../unit-helper/loggerFactory/config-1');
            process.env.NODE_CONFIG_DIR = configDir;

            const logger = LoggerFactory.createLoggerFromNodeConfig(NodeConfig(true));

            Should.exist(logger);
            logger.should.be.an.instanceOf(Logger);

            const loggerWrapper = new LoggerWrapper(logger);

            Internals.runTests({
                logger: loggerWrapper,
                loggerFunctionsToTest: ['debug'],
                msg: 'Hello, world!',
                data: {var1: 'var1'},
                expectedOutput: ''
            });

            Internals.runTests({
                logger: loggerWrapper,
                loggerFunctionsToTest: ['info', 'notice', 'warning', 'error'],
                msg: 'Hello, world!',
                data: {var1: 'var1'},
                expectedOutput: {message: 'Hello, world!', data:{var1: 'var1'}}
            });
        });

        it('Should create a disabled logger', function() {

            const configDir = Path.resolve(__dirname, '../unit-helper/loggerFactory/config-2');
            process.env.NODE_CONFIG_DIR = configDir;

            const logger = LoggerFactory.createLoggerFromNodeConfig(NodeConfig(true));

            Should.exist(logger);
            logger.should.be.an.instanceOf(Logger);

            const loggerWrapper = new LoggerWrapper(logger);

            Internals.runTests({
                logger: loggerWrapper,
                loggerFunctionsToTest: ['debug','info', 'notice', 'warning', 'error'],
                msg: 'Hello, world!',
                data: {var1: 'var1'},
                expectedOutput: ''
            });
        });

    });
});

class Internals {

    /**
     * @param {object} config
     * @param {LoggerWrapper} config.logger
     * @param {string[]} config.loggerFunctionsToTest
     * @param {string} config.msg
     * @param {any} [config.data]
     * @param {any} config.expectedOutput
     */
    static runTests(config) {
        const logger = config.logger;
        let expOutput = config.expectedOutput;

        config.loggerFunctionsToTest.forEach((functionName) => {
            console.log(functionName);
            const output = logger[functionName](config.msg, config.data);
            if (expOutput instanceof Object) {
                expOutput.level = functionName;
            }
            output.should.deepEqual(expOutput);
        });
    }
}