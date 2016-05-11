'use strict';

const Joi = require('joi');
const ConsoleTransportConfig = require('./transports/console/consoleTransportConfig');

module.exports = {
    enabled: Joi.boolean().required(),
    consoleTransport: Joi.object().type(ConsoleTransportConfig).required()
};
