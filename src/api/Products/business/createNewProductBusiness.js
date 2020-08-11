import * as _ from 'lodash';
import { serializeProducts } from '../product.serialize';
import { createProduct, getProductWithId } from '../database';
import { AppError } from '../../../utils/appError';
import {
  isValidDate,
  responseError,
  toDateString,
} from '../../../shared/helpers';
import {
  serializeAuction,
  serializeAuctionFromProduct,
  serializefullAction,
  serializefullActionDetail,
} from '../../AuctionManagement/auction.serialize';
import {
  createAuction,
  updateAuctionBuyerId,
} from '../../AuctionManagement/business';
import { getWinningHistoryFromAuctionWithAuctionId } from '../../AuctionHistories/business';

const cron = require('node-cron');

async function onAuctionEnded(auctionId, productId) {
  const winningData = await getWinningHistoryFromAuctionWithAuctionId(
    auctionId,
  );
  if (!winningData) {
    throw new AppError('There is no winning data', 204);
  }

  winningData.productId = productId;
  const updatedAuction = await updateAuctionBuyerId(winningData);
  if (!updatedAuction) {
    throw new AppError('Cannot update winning Buyer', 204);
  }

  return updatedAuction;
}

async function createCronJobForAutoEndAuction(auction) {
  // cron job to check if auction has ended
  const task = cron.schedule('*/1 * * * *', async () => {
    const currentTime = new Date(_.now());
    console.log('🤖🤖🤖', 'Checking Auction remaining time', auction);
    console.log('Current time:', toDateString(currentTime));
    console.log('End time:', toDateString(auction.endAt));
    if (currentTime >= auction.endAt) {
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

export async function createNewProductBusiness(req, res) {
  try {
    const { body } = req;
    body.createdBy = req.currentUser.id;
    body.updatedBy = req.currentUser.id;
    const product = await createProduct(body);
    if (!product) {
      throw new AppError('Cannot create product', 204);
    }

    product.description = req.body.description;
    product.endAt = req.body.endAt;

    const auction = {
      sellerId: _.get(product, 'createdBy', ''),
      productId: _.get(product, 'id', ''),
      description: _.get(product, 'description', ''),
      createdBy: _.get(product, 'createdBy', ''),
      updatedBy: _.get(product, 'updatedBy', ''),
      endAt: _.get(product, 'endAt', ''),
    };
    const newAuction = await createAuction(auction);
    if (!newAuction) {
      throw new AppError('Cannot start auction', 204);
    }
    const fullActionDetail = serializefullActionDetail(product, newAuction);

    // cronjob start here
    if (isValidDate(fullActionDetail.endAt)) {
      await createCronJobForAutoEndAuction(fullActionDetail);
    }

    return await getProductWithId(fullActionDetail.productId);
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
