import { responseError, responseSuccess } from '../../shared/helpers';
import { serializeProducts, serializeAllProducts } from './product.serialize';
import {
  getAllProductsBusiness,
  getProductByIdBusiness,
  updateProductCurrentPriceBusiness,
} from './business';
import { createNewProductBusiness } from './business/createNewProductBusiness';

export async function getProducts(req, res) {
  try {
    const data = await getAllProductsBusiness(req, res);
    const serializedData = serializeAllProducts(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getProductsById(req, res) {
  try {
    const data = await getProductByIdBusiness(req, res);
    const serializedProduct = serializeProducts(data);
    responseSuccess(res, serializedProduct);
  } catch (error) {
    responseError(res, error);
  }
}

/*
 * Create new Product
 * Start a cronjob to check when auction ended
 * update buyerId for auction if there was a bid
 */
export async function createNewProduct(req, res) {
  try {
    const data = await createNewProductBusiness(req, res);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

/*
 * Bidding action
 * New price must be higher than current price
 * When succeed create a history for the bidding transaction
 */
export async function updateProductCurrentPrice(req, res) {
  try {
    const data = await updateProductCurrentPriceBusiness(req, res);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}
