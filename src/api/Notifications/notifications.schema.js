import * as Joi from 'joi';

export const NotificationSchema = Joi.object({
  description: Joi.string().required(),
});

export const NotficationUpdateSchema = Joi.object({
  description: Joi.string().required(),
  createdAt: Joi.date().required(),
});
