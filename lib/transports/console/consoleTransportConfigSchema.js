'use strict';

const Joi = require('joi');

module.exports = {
    enabled: Joi.boolean().required(),
    level: Joi.string().valid(['error','warning','notice','info','debug']).required(),
    colorize: Joi.boolean().required()
};