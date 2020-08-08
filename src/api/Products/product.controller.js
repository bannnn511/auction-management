import {
  isValidDate,
  responseError,
  responseSuccess,
  toDateString,
} from '../../shared/helpers';
import {
  createProduct,
  getAllProducts,
  getProductWithId,
  updateProductPrice,
} from './database/index';
import {
  serializeProducts,
  serializeAllProducts,
  serializeBidProduct,
} from './product.serialize';
import {
  serializeAuctionFromProduct,
  serializefullActionDetail,
  serializeAuction,
  serializefullAction,
} from '../AuctionManagement/auction.serialize';
import {
  createAuction,
  getAuctionWithProductId,
  updateAuctionBuyerId,
} from '../AuctionManagement/business/index';
import { AppError } from '../../utils/appError';
import {
  createAuctionHistory,
  getWinningHistoryFromAuctionWithAuctionId,
} from '../AuctionHistories/business';
import {
  serializeAuctionHistory,
  serializedAuctionHistory,
} from '../AuctionHistories/history.serialize';
import { getAllProductsBusiness, getProductByIdBusiness } from './business';
import { createNewProductBusiness } from './business/createNewProductBusiness';

const _ = require('lodash');

export async function getProducts(req, res) {
  try {
    const data = getAllProductsBusiness(req, res);
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
    const data = createNewProductBusiness(req, res);
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
    const { id } = req.params;
    req.body.updatedBy = req.currentUser.id;
    req.body.id = id;
    const serializedBody = serializeBidProduct(req.body);

    // check product exist
    const checkProduct = await getProductWithId(id);
    if (!checkProduct) {
      res.status(204).send('Product does not exist');
    }
    const currentProduct = serializeProducts(checkProduct);
    console.log({ currentProduct });

    // check auction exist
    const auction = await getAuctionWithProductId(id);
    if (!auction) {
      throw new AppError('There is no auction with this product', 204);
    }

    // check if bidding price is valid
    if (currentProduct.currentPrice >= serializedBody.price) {
      throw new AppError(
        'Bidding price must be higher than current price',
        406,
      );
    }

    // check if bidding time is till valid
    if (auction.endAt <= new Date(_.now())) {
      throw new AppError('Bidding time has expired', 204);
    }

    const serializedAuction = serializeAuction(auction);
    console.log({ currentProduct: serializedAuction });

    const newProduct = await updateProductPrice(serializedBody);
    if (!newProduct) {
      throw new AppError('Bid product failed', 204);
    }
    const serializedProduct = serializeProducts(newProduct);
    console.log('New product detail', serializedProduct);
    const fullAuctionDetail = serializeAuctionHistory(
      serializedBody,
      serializedProduct,
      serializedAuction,
    );

    // create auction history
    const history = await createAuctionHistory(fullAuctionDetail);
    if (!history) {
      throw new AppError('Cannot create Auction History', 204);
    }
    responseSuccess(res, newProduct);
  } catch (error) {
    responseError(res, error);
  }
}
