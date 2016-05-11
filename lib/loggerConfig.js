'use strict';

const Joi = require('joi');
const VO = require('hapiest-vo');
const LoggerConfigSchema = require('./loggerConfigSchema');

class LoggerConfig extends VO {

    /**
     * @param {object} loggerConfig
     * @param {boolean} loggerConfig.enabled
     * @param {ConsoleTransportConfig} loggerConfig.consoleTransport
     */
    constructor(loggerConfig) {
        super();
        
        // Validate the config being passed in
        const result = Joi.validate(loggerConfig, LoggerConfigSchema);

        if (result.error) {
            throw result.error;
        }

        this._addProperties(loggerConfig);
    }

    /**
     * @returns {boolean}
     */
    get enabled() { return this.get('enabled'); }

    get consoleTransport() { return this.get('consoleTransport'); }


    /*
    @TODO: implement all the transports

    get logglyTransport() { return this.get('logglyTransport'); }

    get newrelicTransport() { return this.get('newrelicTransport'); }

    get raygunTransport() { return this.get('raygunTransport'); }
    */
    
}

module.exports = LoggerConfig;