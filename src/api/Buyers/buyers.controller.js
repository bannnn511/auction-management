import {
  getBuyers,
  createBuyer,
  deleteBuyer,
  requestingToBeSeller,
  getRequestingBuyers,
  acceptBuyerReq,
  updateBuyerPassword,
  getUserIdNoPass,
} from './business/index';
import { serializeBuyers, serializedCreatedBuyer } from './buyers.serialize';

// get buyer with status active but not admin
export async function getAllBuyers(req, res, next) {
  try {
    const allBuyers = await getBuyers();
    const data = [];
    allBuyers.forEach((buyer) => {
      data.push(serializeBuyers(buyer));
    });
    console.log(data);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

// register user as buyer or seller by admin
export async function createNewBuyer(req, res, next) {
  try {
    const body = serializedCreatedBuyer(req.body);
    console.log(body);
    const buyer = await createBuyer(body);
    res.status(200).json({ buyer });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

// update buyer status to deleted
export async function deleteABuyer(req, res, next) {
  try {
    const body = serializedCreatedBuyer(req.body);
    console.log(body);
    const buyer = await deleteBuyer(body.id, body.updatedBy);
    res.status(200).json({ buyer });
  } catch (error) {
    console.log('🔥🔥🔥 Delete', error);
    res.status(400).send(error);
  }
}

// update buyer isSeller to true
export async function requestToBeASeller(req, res, next) {
  try {
    const body = serializedCreatedBuyer(req.body);
    const buyer = await requestingToBeSeller(body.id, body.updatedBy);
    res.status(200).json({ buyer });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

// get buyer which isSeller is true
export async function getAllRequestingBuyers(req, res, next) {
  try {
    const body = serializeBuyers(req.body);
    const buyer = await getRequestingBuyers(body);
    res.status(200).json({ buyer });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

// update buyer type to seller
export async function acceptABuyerReq(req, res, next) {
  try {
    const body = serializeBuyers(req.body);
    const buyer = await acceptBuyerReq(body);
    res.status(200).json({ buyer });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

// update buyer password
export async function updateABuyerPassword(req, res, next) {
  try {
    const body = serializeBuyers(req.body);
    const buyer = await updateBuyerPassword(body);
    res.status(200).json({ buyer });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
