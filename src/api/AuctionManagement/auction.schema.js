import * as Joi from 'joi';

export const banUserFromAuctionSchema = Joi.object({
  userId: Joi.string().required(),
});

export const auctionDescriptionSchema = Joi.object({
  description: Joi.string().required(),
});
