'use strict';

const Should = require('should');
const Winston = require('winston');
const WinstonLoggerClass = Winston.Logger;
const Logger = require('../../index');

describe('Index.js', function() {
   it('Should be our Logger class', function() {
      // constructor takes winstonLogger
      const winstonLogger = new WinstonLoggerClass({});
      winstonLogger.setLevels(Winston.config.syslog.levels);
      const logger = new Logger(winstonLogger);

      logger.debug.should.be.a.Function();
      logger.info.should.be.a.Function();
      logger.notice.should.be.a.Function();
      logger.warning.should.be.a.Function();
      logger.error.should.be.a.Function();
   });
});