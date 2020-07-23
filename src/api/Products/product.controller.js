import { responseError, responseSuccess } from '../../shared/helpers';
import { createProduct, getAllProducts } from './business/index';
import { serializeProducts, serializeAllProducts } from './product.serialize';
import {
  serializeAuctionFromProduct,
  serializefullActionDetail,
} from '../AuctionManagement/auction.serialize';
import { createAuction } from '../AuctionManagement/business/index';
import { AppError } from '../../utils/appError';

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
    if (!product) {
      throw new AppError('Cannot create product', 204);
    }
    const data = serializeProducts(product);
    Object.assign(data, req.body.description);
    console.log('✨✨✨ Product datas', data);

    const auction = serializeAuctionFromProduct(data);
    const newAuction = await createAuction(auction);
    if (!newAuction) {
      throw new AppError('Cannot start auction', 204);
    }
    console.log('👌👌👌 Auction data', newAuction.dataValues);

    const fullActionDetail = serializefullActionDetail(data, newAuction);
    console.log('Full Auction Detail', fullActionDetail);
    responseSuccess(res, fullActionDetail);
  } catch (error) {
    responseError(res, error);
  }
}
