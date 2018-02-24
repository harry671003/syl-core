const Joi = require('joi');

const convContentSchema = Joi.object().keys({
  type: Joi.string().allow(['text']).required(),
  value: Joi.string(),
});

module.exports = convContentSchema;
