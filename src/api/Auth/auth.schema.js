import * as Joi from '@hapi/joi';
import { UserType, UserStatus } from '../../shared/helpers/constant';

// const UserTypeJoi = Joi.object().keys({
//   type: Joi.valid(UserType.BUYER),
// });
export const AccountLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const AccountRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  address: Joi.string().required(),
  fullname: Joi.string().required(),
  type: Joi.valid(UserType.BUYER),
  status: Joi.valid(UserStatus.ACTIVE),
});
