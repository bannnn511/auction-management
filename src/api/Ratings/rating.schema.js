import * as Joi from '@hapi/joi';

export const ratingSchema = Joi.object({
  auctionId: Joi.string().required(),
  point: Joi.number().required(),
  description: Joi.optional(),
});
