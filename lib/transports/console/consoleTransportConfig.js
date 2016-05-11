'use strict';

const Joi = require('joi');

const VO = require('hapiest-vo');
const ConsoleTransportConfigSchema = require('./consoleTransportConfigSchema');

class ConsoleTransportConfig extends VO {

    /**
     * @param {object} config
     * @param {boolean} config.enabled
     * @param {string} config.level
     * @param {boolean} config.colorize
     */
    constructor(config) {
        super();

        const result = Joi.validate(config, ConsoleTransportConfigSchema);
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

    /**
     * @returns {boolean}
     */
    get colorize() {return this.get('colorize')}

}

module.exports = ConsoleTransportConfig;