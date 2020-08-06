import * as Joi from 'joi';

export const UserCreateSchema = Joi.object({
  email: Joi.string().email().required(),
});
