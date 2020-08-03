import {
  getBuyers,
  createBuyer,
  deleteBuyer,
  requestingToBeSeller,
  getRequestingBuyers,
  acceptBuyerReq,
  updateBuyerPassword,
  getUserIdNoPass,
  requestingBackToBuyer,
  requestingUpdatedInfo,
  getBuyerDetailWithId,
} from './business/index';
import { serializeBuyers, serializeAllBuyers } from './buyers.serialize';
import { responseError, responseSuccess } from '../../shared/helpers';
import { UserType } from '../../shared/helpers/constant';
import { getLoginUserById } from '../Auth/business';
import { AppError } from '../../utils/appError';

// get buyer with status active but not admin
export async function getAllBuyers(req, res) {
  try {
    let data;
    const { id } = req.params;
    if (id === undefined) {
      const allBuyers = await getBuyers();
      if (!allBuyers) {
        throw new AppError('Cannot get Buyers', 400);
      }
      data = serializeAllBuyers(allBuyers);
    } else {
      const buyer = await getBuyerDetailWithId(id);
      if (!buyer) {
        throw new AppError(`Cannt get Buyer with id: ${id}`);
      }
      data = serializeBuyers(buyer);
    }
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

// update buyer isSeller to true
export async function requestToBeASeller(req, res) {
  try {
    req.body.updatedBy = req.currentUser.id;
    const { id, updatedBy } = serializeBuyers(req.body);
    const buyer = await requestingToBeSeller(id, updatedBy);
    if (!buyer) {
      throw new AppError('Request to be a Seller failed', 204);
    }
    const data = serializeBuyers(buyer, false);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

// update buyer isSeller to false
export async function requestBackToBuyer(req, res) {
  try {
    req.body.updatedBy = req.currentUser.id;
    const { id, updatedBy } = serializeBuyers(req.body);
    const seller = await requestingBackToBuyer(id, updatedBy);
    if (!seller) {
      throw new AppError('Request back to be a buyer failed', 204);
    }
    const data = serializeBuyers(seller, false);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

// get buyer which isSeller is true
export async function getAllRequestingBuyers(req, res) {
  try {
    const buyer = await getRequestingBuyers();
    if (!buyer) {
      throw new AppError('Get all requesting buyers failed', 204);
    }
    const data = serializeAllBuyers(buyer, false);
    console.log(data);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

// update buyer type to seller
export async function acceptABuyerReq(req, res) {
  try {
    req.body.updatedBy = req.currentUser.id;
    const { id, updatedBy } = serializeBuyers(req.body);
    const buyer = await acceptBuyerReq(id, updatedBy);
    if (!buyer) {
      throw new AppError('Buyer to be Seller failed', 204);
    }
    const data = serializeBuyers(buyer, false);
    console.log(data);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

// update buyer password
export async function updateABuyerPassword(req, res) {
  try {
    req.body.updatedBy = req.currentUser.id;
    const body = serializeBuyers(req.body, true);
    if (req.currentUser.type !== UserType.ADMIN) {
      if (body.id !== req.currentUser.id) {
        throw new AppError('Request denied', 406);
      }
    }
    const buyer = await updateBuyerPassword(body);
    if (!buyer) {
      throw new AppError("Update Buyer's password failed");
    }
    const data = serializeBuyers(buyer);
    console.log(data);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

// update buyer info
export async function updateBuyerInfo(req, res) {
  try {
    req.body.updatedBy = req.currentUser.id;
    const body = serializeBuyers(req.body, false);
    const userInfo = await getLoginUserById(req.currentUser.id);

    if (body.fullname === '') {
      body.fullname = userInfo.fullname;
    }
    if (body.address === '') {
      body.address = userInfo.address;
    }

    const buyer = await requestingUpdatedInfo(body);
    if (!buyer) {
      throw new AppError("Cannot update Buyer's info");
    }
    const data = serializeBuyers(buyer);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}
