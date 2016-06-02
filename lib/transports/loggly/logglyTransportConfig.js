'use strict';

const VO = require('hapiest-vo');
const Joi = require('joi');
const LogglyTransportConfigSchema = require('./logglyTransportConfigSchema');

class LogglyTransportConfig extends VO {

    /**
     * @param {object} config
     * @param {boolean} config.enabled
     * @param {string} config.level
     * @param {string} config.token
     * @param {string} config.subdomain
     */
    constructor(config) {
        super();

        const result = Joi.validate(config, LogglyTransportConfigSchema);
        if (result.error) {throw result.error;}

        this._addProperties(config);
    }

    /**
     * @returns {boolean}
     */
    get enabled() {return this.get('enabled')}

    /**
     * @returns {error|warn|notice|info|debug}
     */
    get level() {return this.get('level')}

    get token() {return this.get('token');}
    get subdomain() {return this.get('subdomain');}
    get tags() {return this.get('tags');}

}

module.exports = LogglyTransportConfig;
