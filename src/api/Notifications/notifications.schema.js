import * as Joi from 'joi';

export const NotificationSchema = Joi.object({
  description: Joi.string().required(),
});
