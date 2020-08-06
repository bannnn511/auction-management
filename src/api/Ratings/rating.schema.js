import * as Joi from 'joi';

export const ratingSchema = Joi.object({
  auctionId: Joi.string().required(),
  point: Joi.number().required(),
  description: Joi.optional(),
});
