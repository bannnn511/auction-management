import * as Joi from 'joi';

export const FavouriteProductSchema = Joi.object({
  productId: Joi.string().required(),
});

export const FavoriteCategorySchema = Joi.object({
  category: Joi.string().required(),
});
