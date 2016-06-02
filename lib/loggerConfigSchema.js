'use strict';

const Joi = require('joi');
const ConsoleTransportConfig = require('./transports/console/consoleTransportConfig');
const LogglyTransportConfig = require('./transports/loggly/logglyTransportConfig');

module.exports = {
    enabled: Joi.boolean().required(),
    consoleTransport: Joi.object().type(ConsoleTransportConfig).optional(),
    logglyTransport: Joi.object().type(LogglyTransportConfig).optional()
};
