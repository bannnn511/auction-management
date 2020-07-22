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
} from './business/index';
import { serializeBuyers, serializeAllBuyers } from './buyers.serialize';
import { responseError, responseSuccess } from '../../shared/helpers';

// get buyer with status active but not admin
export async function getAllBuyers(req, res) {
  try {
    const allBuyers = await getBuyers();
    const data = serializeAllBuyers(allBuyers);
    console.log('Get all active buyer', data);

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
      res.status(400).send('User already exists');
      // next(new AppError('User already exists', 400));
    }
    const buyer = await createBuyer(body);
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
    req.body.updatedBy = req.currentUser.id;
    const body = serializeBuyers(req.body);
    const buyer = await deleteBuyer(body.id, body.updatedBy);
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
    const data = serializeBuyers(seller, false);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

// get buyer which isSeller is true
export async function getAllRequestingBuyers(req, res) {
  try {
    req.body.updatedBy = req.currentUser.id;
    const buyer = await getRequestingBuyers();
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
    const { id } = serializeBuyers(req.body);
    const buyer = await acceptBuyerReq(id);
    console.log({ myBuyer: buyer });
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
    const body = serializeBuyers(req.body);
    const buyer = await updateBuyerPassword(body);
    const data = serializeBuyers(buyer);
    console.log(data);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}
