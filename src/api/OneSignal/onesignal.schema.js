import * as Joi from 'joi';

export const OneSignalSchema = Joi.object({
  description: Joi.string().required(),
});
