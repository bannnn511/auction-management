import * as Joi from 'joi';

export const NotificationCreationSchema = Joi.object({
  description: Joi.string().required(),
});
