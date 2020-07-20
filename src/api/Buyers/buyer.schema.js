import * as Joi from '@hapi/joi';

export const createBuyerOrSellerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  type: Joi.required(),
  fullname: Joi.string().required(),
  // createdBy: Joi.string().required(),
  // updatedBy: Joi.string().required(),
});
