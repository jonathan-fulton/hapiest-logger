'use strict';

const Joi = require('joi');

module.exports = {
    enabled: Joi.boolean().required(),
    level: Joi.string().valid(['error','warning','notice','info','debug']).required(),

    token: Joi.when('enabled', {is: true, then: Joi.string().required(), otherwise: Joi.string().optional()}),
    subdomain: Joi.when('enabled', {is: true, then: Joi.string().required(), otherwise: Joi.string().optional()}),
    tags: Joi.array().items(Joi.string()).optional()
};