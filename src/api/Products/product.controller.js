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

const cron = require('node-cron');
const _ = require('lodash');

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

async function onAuctionEnded(auctionId, productId) {
  const winningData = await getWinningHistoryFromAuctionWithAuctionId(
    auctionId,
  );
  if (!winningData) {
    throw new AppError('There is no winning data', 204);
  }
  const serializedWinningData = serializedAuctionHistory(winningData);
  console.log('The winners: ', serializedWinningData);
  serializedWinningData.productId = productId;
  const updatedAuction = await updateAuctionBuyerId(serializedWinningData);
  if (!updatedAuction) {
    throw new AppError('Cannot update winning Buyer', 204);
  }
  const serializedUpdatedAuction = serializeAuction(updatedAuction);
  console.log('Updated post-Auction data:', serializedUpdatedAuction);
  return serializedUpdatedAuction;
}

async function createCronJobForAutoEndAuction(auction) {
  // cron job to check if auction has ended
  const task = cron.schedule('*/1 * * * *', async () => {
    const currentTime = toDateString(_.now());
    const endTime = toDateString(auction.endAt);
    console.log('🤖🤖🤖', 'Checking Auction remaining time', auction);
    console.log('Current time:', currentTime);
    console.log('End time:', endTime);
    if (currentTime >= endTime) {
      console.log('🤖', 'Auction has ended');
      const auctionEnded = await onAuctionEnded(
        auction.auctionId,
        auction.productId,
      );
      const serializedPostAuction = serializefullAction(auctionEnded);
      console.log(serializedPostAuction);
      task.destroy();
    }
  });
}

export async function createNewProduct(req, res, next) {
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
    data.endAt = toDateString(req.body.endAt);
    console.log('✨✨✨ Product datas', data);

    const auction = serializeAuctionFromProduct(data);
    const newAuction = await createAuction(auction);
    if (!newAuction) {
      throw new AppError('Cannot start auction', 204);
    }

    const fullActionDetail = serializefullActionDetail(data, newAuction);
    console.log('Full Auction Detail', fullActionDetail);

    if (isValidDate(fullActionDetail.endAt)) {
      await createCronJobForAutoEndAuction(fullActionDetail);
    }

    responseSuccess(res, fullActionDetail);
  } catch (error) {
    responseError(res, error);
  }
}

export async function updateProductCurrentPrice(req, res) {
  try {
    req.body.updatedBy = req.currentUser.id;
    const serializedBody = serializeBidProduct(req.body);

    // check product exist
    const checkProduct = await getProductWithId(serializedBody);
    if (!checkProduct) {
      res.status(204).send('Product does not exist');
    }
    const currentProduct = serializeProducts(checkProduct);
    console.log({ currentProduct });

    // check auction exist
    const auction = await getAuctionWithProductId(currentProduct);
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
    if (toDateString(auction.endAt) <= toDateString(_.now())) {
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
