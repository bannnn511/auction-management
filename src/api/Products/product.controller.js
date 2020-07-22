import { responseError, responseSuccess } from '../../shared/helpers';
import { createProduct, getAllProducts } from './business/index';
import { serializeProducts, serializeAllProducts } from './product.serialize';

export async function getProducts(req, res) {
  try {
    const product = await getAllProducts();
    const data = serializeAllProducts(product);
    console.log(data);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

export async function createNewProduct(req, res) {
  try {
    req.body.createdBy = req.currentUser.id;
    req.body.updatedBy = req.currentUser.id;
    const body = serializeProducts(req.body);
    const product = await createProduct(body);
    const data = serializeProducts(product);
    console.log(data);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}
