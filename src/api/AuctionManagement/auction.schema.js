import * as Joi from 'joi';

export const banUserFromAuctionSchema = Joi.object({
  userId: Joi.string().required(),
});
