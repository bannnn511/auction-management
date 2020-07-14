import * as Joi from '@hapi/joi';

export const UserCreateSchema = Joi.object({
  email: Joi.string().email().required(),
});
