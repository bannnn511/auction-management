import * as Joi from 'joi';

export const createProductAuctionSchema = Joi.object({
  productName: Joi.string().required(),
  imgURL: Joi.string(),
  currentPrice: Joi.number().required(),
  buyNowPrice: Joi.number(),
  endAt: Joi.date().required(),
  description: Joi.string(),
  category: Joi.string(),
});

export const updateProductAuctionSchema = Joi.object({
  productName: Joi.string(),
  buyNowPrice: Joi.number(),
  endAt: Joi.date(),
  imgURL: Joi.string(),
  description: Joi.string(),
});

export const updateProductPriceAuctionSchema = Joi.object({
  price: Joi.number().required(),
});
