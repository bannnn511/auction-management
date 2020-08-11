import { responseError, responseSuccess } from '../../shared/helpers';
import {
  serializeFavouriteProduct,
  serializeAllFavouriteProduct,
} from './favourite.serialize';
import {
  createFavouriteProductBusiness,
  getFavouriteProductsBusiness,
} from './business';

export async function createNewFavouriteProduct(req, res) {
  try {
    const data = await createFavouriteProductBusiness(req, res);
    const serializedData = serializeFavouriteProduct(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getListFavouriteProducts(req, res) {
  try {
    const data = await getFavouriteProductsBusiness(req, res);
    const serializedData = serializeAllFavouriteProduct(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}
