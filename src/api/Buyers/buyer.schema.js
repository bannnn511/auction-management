import * as Joi from '@hapi/joi';
import { UserType, UserStatus } from '../../shared/helpers/constant';

export const createBuyerOrSellerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fullname: Joi.string()
    .pattern(/^[a-zA-Z]+/)
    .required(),
  type: Joi.valid(UserType.BUYER, UserType.SELLER),
  status: Joi.valid(UserStatus.ACTIVE),
});

export const updateBuyerOrSellerSchema = Joi.object({
  fullname: Joi.string()
    .empty('')
    .pattern(/^[a-zA-Z]+/),
  address: Joi.any(),
  type: Joi.valid(UserType.BUYER, UserType.SELLER),
  status: Joi.valid(UserStatus.ACTIVE),
  isSeller: Joi.bool(),
});

export const changeBuyerOrSellerPasswordSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
});
