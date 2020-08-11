import { responseError, responseSuccess } from '../../shared/helpers';
import { serializeFavouriteProduct } from './favourite.serialize';
import { createFavouriteProductBusiness } from './business';

export async function createNewFavouriteProduct(req, res) {
  try {
    const data = await createFavouriteProductBusiness(req, res);
    const serializedData = serializeFavouriteProduct(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}
