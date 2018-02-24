const Joi = require('joi');
const personSchema = require('./person-schema');

const inputSourceSchema = Joi.object().keys({
  client: Joi.string().allow(['telegram']).required(),
  person: personSchema.required(),
});

module.exports = inputSourceSchema;
