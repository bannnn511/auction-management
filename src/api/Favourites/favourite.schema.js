import * as Joi from 'joi';

export const FavouriteProductSchema = Joi.object({
  productId: Joi.string().required(),
});
