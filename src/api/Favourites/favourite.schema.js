import * as Joi from 'joi';

export const FavouriteProductSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
});
