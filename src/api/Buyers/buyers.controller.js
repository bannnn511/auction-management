import {
  getBuyers,
  createBuyer,
  deleteBuyer,
  getRequestingBuyers,
  updateBuyerPassword,
  getUserIdNoPass,
  requestingUpdatedInfo,
  getBuyerDetailWithId,
  updateAUserInfoByAdmin,
} from './business/index';
import { serializeBuyers, serializeAllBuyers } from './buyers.serialize';
import { responseError, responseSuccess, getToken } from '../../shared/helpers';
import { UserType } from '../../shared/helpers/constant';
import { getLoginUserById } from '../Auth/business';
import { AppError } from '../../utils/appError';
import { client } from '../../shared/helpers/redis';

// get buyer with status active but not admin
export async function getAllBuyers(req, res) {
  try {
    const { isseller, type } = req.query;
    console.log(req.query);
    let data;
    if (isseller !== undefined || type !== undefined) {
      data = await getRequestingBuyers(isseller, type);
    } else {
      data = await getBuyers();
    }
    if (!data) {
      throw new AppError('Cannot get Buyers', 400);
    }
    data = serializeAllBuyers(data);
    console.log(data);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getABuyerDetailWithId(req, res) {
  try {
    const { id } = req.params;
    const buyer = await getBuyerDetailWithId(id);
    if (!buyer) {
      throw new AppError(`Cannt get Buyer with id: ${id}`);
    }
    const data = serializeBuyers(buyer);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

// register user as buyer or seller by admin
export async function createNewBuyer(req, res) {
  try {
    req.body.createdBy = req.currentUser.id;
    req.body.updatedBy = req.currentUser.id;
    const body = serializeBuyers(req.body, true);
    const checkBuyerExist = await getUserIdNoPass(body);
    if (checkBuyerExist) {
      throw new AppError('User already exists', 400);
    }
    const buyer = await createBuyer(body);
    if (!buyer) {
      throw new AppError('Cannot create user', 204);
    }
    const data = serializeBuyers(buyer, false);
    console.log(data);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

// update buyer status to deleted
export async function deleteABuyer(req, res) {
  try {
    const updatedBy = req.currentUser.id;
    const { id } = req.params;
    console.log(id);
    const buyer = await deleteBuyer(id, updatedBy);
    if (!buyer) {
      throw new AppError('Cannot delete user', 204);
    }
    const data = serializeBuyers(buyer, false);
    console.log(data);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

/*
 * Update buyer password
 * destroy token after update password
 */
export async function updateABuyerPassword(req, res) {
  try {
    const { id } = req.params;
    req.body.updatedBy = req.currentUser.id;
    const body = serializeBuyers(req.body, true);

    // check if Id is the same here
    if (req.currentUser.type !== UserType.ADMIN) {
      if (id !== req.currentUser.id) {
        throw new AppError('Request to change password denied', 406);
      }
    }

    const buyer = await updateBuyerPassword(body);
    if (!buyer) {
      throw new AppError("Update Buyer's password failed");
    }
    const data = serializeBuyers(buyer);
    console.log(data);

    // Delete Token here
    const token = getToken(req);
    await client.rpush('token', token, (err, reply) => {
      console.log({ reply });
    });

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

// update buyer info
export async function updateBuyerInfo(req, res) {
  try {
    const { id } = req.params;
    req.body.updatedBy = req.currentUser.id;
    const body = serializeBuyers(req.body, false);
    const userInfo = await getLoginUserById(req.currentUser.id);
    if (!userInfo) {
      throw new AppError(
        `There is no user with current id: ${req.currentUser.id}`,
        204,
      );
    }
    if (id !== req.currentUser.id) {
      throw new AppError('Id not acceptable', 400);
    }
    const buyer = await requestingUpdatedInfo(body, serializeBuyers(userInfo));
    if (!buyer) {
      throw new AppError("Cannot update Buyer's info");
    }
    const data = serializeBuyers(buyer);
    console.log(data);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

// update buyer info
export async function updateUserInfoByAdmin(req, res) {
  try {
    const { id } = req.params;
    req.body.updatedBy = req.currentUser.id;
    const body = serializeBuyers(req.body, false);
    const userInfo = await getLoginUserById(id);
    if (!userInfo) {
      throw new AppError(
        `There is no user with current id: ${req.currentUser.id}`,
        204,
      );
    }

    const buyer = await updateAUserInfoByAdmin(
      id,
      body,
      serializeBuyers(userInfo),
    );
    if (!buyer) {
      throw new AppError("Cannot update Buyer's info");
    }
    const data = serializeBuyers(buyer);
    console.log(data);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}
