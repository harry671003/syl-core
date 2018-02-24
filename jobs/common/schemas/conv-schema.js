const Joi = require('joi');
const convSourceSchema = require('./conv-source-schema');
const convContentSchema = require('./conv-content-schema');

const convSchema = Joi.object().keys({
  content: convContentSchema.required(),
  source: convSourceSchema.required(),
  sourceInput: Joi.object().required(),
});

module.exports = convSchema;
