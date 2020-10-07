import * as Joi from 'joi';

export const OneSignalSchema = Joi.object({
  playerId: Joi.string().required(),
});
