import * as Joi from '@hapi/joi';

export const productSchema = Joi.object({
  productName: Joi.string().required(),
  imgUrl: Joi.string(),
  currentPrice: Joi.number(),
  buyNowPrice: Joi.number(),
  endAt: Joi.date(),
});
