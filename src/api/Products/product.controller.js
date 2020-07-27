import {
  responseError,
  responseSuccess,
  toDateString,
} from '../../shared/helpers';
import {
  createProduct,
  getAllProducts,
  getProductWithId,
} from './business/index';
import {
  serializeProducts,
  serializeAllProducts,
  serializeBidProduct,
} from './product.serialize';
import {
  serializeAuctionFromProduct,
  serializefullActionDetail,
  serializeAuction,
} from '../AuctionManagement/auction.serialize';
import { createAuction } from '../AuctionManagement/business/index';
import { AppError } from '../../utils/appError';
import { updateProductPrice } from './business/post-update-product-price';
import { getAuctionWithProductId } from '../AuctionManagement/business/get-auction-with-product-id';
import { createAuctionHistory } from '../AuctionHistories/business/post-create-auction-history';
import { serializeAuctionHistory } from '../AuctionHistories/history.serialize';

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
    data.description = req.body.description;
    const date = toDateString(req.body.endAt);
    data.endAt = date;
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

export async function updateProductCurrentPrice(req, res) {
  try {
    req.body.updatedBy = req.currentUser.id;
    const serializedBody = serializeBidProduct(req.body);
    const checkProduct = await getProductWithId(serializedBody);
    if (!checkProduct) {
      res.status(204).send('Product does not exist');
    }
    const currentProduct = serializeProducts(checkProduct);
    console.log({ currentProduct });

    if (currentProduct.currentPrice >= serializedBody.price) {
      res.status(406).send('Bidding price must be higher than current price');
    } else {
      const auction = await getAuctionWithProductId(currentProduct);
      if (!auction) {
        res.status(204).send('There is no auction with this product');
      }
      const serializedAuction = serializeAuction(auction);
      console.log({ currentProduct: serializedAuction });

      const newProduct = await updateProductPrice(serializedBody);
      if (!newProduct) {
        res.status(204).send('Bid product failed');
      }
      const serializedProduct = serializeProducts(newProduct);
      console.log('New product detail', serializedProduct);
      const fullAuctionDetail = serializeAuctionHistory(
        serializedBody,
        serializedProduct,
        serializedAuction,
      );
      const history = await createAuctionHistory(fullAuctionDetail);
      if (!history) {
        res.status(204).send('Cannot create Auction History');
      }
      responseSuccess(res, newProduct);
    }
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
}
