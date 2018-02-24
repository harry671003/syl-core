const Joi = require('joi');

const personSchema = Joi.object().keys({
  personId: Joi.string().required(),
  firstName: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .required(),
  kind: Joi.string()
    .allow(['bot', 'human'])
    .required(),
});

module.exports = personSchema;
