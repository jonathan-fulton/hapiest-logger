'use strict';

const Should = require('should');
const Path = require('path');
const NodeConfig = require('config-uncached');
const LoggerSingleton = require('../../lib/loggerSingleton');
const Logger = require('../../lib/logger');


describe('LoggerSingleton', function() {
    describe('getLogger', function () {

        it('Should return the same logger', function () {

            const configDir = Path.resolve(__dirname, '../unit-helper/loggerSingleton/config-1');
            process.env.NODE_CONFIG_DIR = configDir;

            const nodeConfig = NodeConfig(true);

            const logger1 = LoggerSingleton.getLogger(nodeConfig);
            Should.exist(logger1);
            logger1.should.be.an.instanceOf(Logger);

            const logger2 = LoggerSingleton.getLogger(nodeConfig);
            Should.exist(logger2);
            logger2.should.be.an.instanceOf(Logger);

            logger1.should.deepEqual(logger2);
        });
        
    });
});