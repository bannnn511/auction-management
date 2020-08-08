import * as Joi from 'joi';

export const AccountLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const AccountRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  address: Joi.string().required(),
  fullname: Joi.string()
    .pattern(/^[a-zA-Z]+/)
    .required(),
});
