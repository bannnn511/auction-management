import { serializeBuyers, serializeAllBuyers } from './buyers.serialize';
import { responseSuccess } from '../../shared/helpers';

import {
  blacklistToken,
  createNewUserByAdminBusiness,
  deleteUserBusiness,
  getAllUserBusinness,
  getUserDetailBusiness,
  updateUserInfoBusiness,
  updateUserInfoByAdminBusiness,
  updateUserPasswordBusiness,
} from './business';

// get buyer with status active but not admin
export async function getAllUsers(req, res, next) {
  try {
    const data = await getAllUserBusinness(req, res);
    const serializedData = serializeAllBuyers(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

export async function getUserDetailWithId(req, res, next) {
  try {
    const data = await getUserDetailBusiness(req, res);
    const serializedData = serializeBuyers(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

// register user as buyer or seller by admin
export async function createNewUser(req, res, next) {
  try {
    const data = await createNewUserByAdminBusiness(req, res);
    const serializedData = serializeBuyers(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

// update buyer status to deleted
export async function deleteUser(req, res, next) {
  try {
    const data = await deleteUserBusiness(req, res);
    const serializedData = serializeBuyers(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

/*
 * Update buyer password
 * destroy token after update password
 */
export async function updateUserPassword(req, res, next) {
  try {
    const data = await updateUserPasswordBusiness(req, res);
    const serializedData = serializeBuyers(data);
    await blacklistToken(req);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

// update buyer info
export async function updateUserInfo(req, res, next) {
  try {
    const data = await updateUserInfoBusiness(req, res);
    const serializedData = serializeBuyers(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

/* Update buyer info by admin
 * Change buyer pending statu
 * Accept buyer request to be a seller
 * Update user basic info
 */
export async function updateUserInfoByAdmin(req, res, next) {
  try {
    const data = await updateUserInfoByAdminBusiness(req, res);
    const serializedData = serializeBuyers(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}
