import * as Joi from '@hapi/joi';

export const AccountLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const AccountRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  address: Joi.required(),
  fullname: Joi.string().required(),
});
