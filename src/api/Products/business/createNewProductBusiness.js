import * as _ from 'lodash';
import { createProduct, getProductWithId } from '../database';
import { AppError } from '../../../utils/appError';
import {
  isValidDate,
  responseError,
  toDateString,
} from '../../../shared/helpers';
import {
  serializefullAction,
  serializefullActionDetail,
} from '../../AuctionManagement/auction.serialize';
import {
  createAuction,
  getAllBuyerInAuction,
  updateAuctionBuyerId,
} from '../../AuctionManagement/database';
import { getWinningHistoryFromAuctionWithAuctionId } from '../../AuctionHistories/database';
import { Email } from '../../../utils/email';
import { addProductToCategory } from '../../CategoriesManagement/database/post-add-product-to-category';
import { getCategoryId } from '../../Categories/database/get-category-id';
import { getFavouriteUserIdFromCategory } from '../../Favourites/database';

const cron = require('node-cron');
const db = require('../../../../models');

async function sendEmail(auctionId) {
  try {
    const datas = await getAllBuyerInAuction(auctionId);
    const emailData = [];
    datas.forEach((data) => {
      emailData.push(data.email);
    });

    const email = new Email(
      process.env.MY_EMAIL,
      emailData,
      'Auction ended',
      `Auction with id: ${auctionId} that you have been participated had ended`,
    );
    email.send();
  } catch (error) {
    console.log(error);
  }
}

async function onAuctionEnded(auctionId, productId) {
  try {
    const winningData = await getWinningHistoryFromAuctionWithAuctionId(
      auctionId,
    );
    if (!winningData) {
      throw new AppError('There is no winning data', 204);
    }

    winningData.productId = productId;
    winningData.auctionId = auctionId;
    const updatedAuction = await updateAuctionBuyerId(winningData);
    if (!updatedAuction) {
      throw new AppError('Cannot update winning Buyer', 204);
    }

    return updatedAuction;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// cron job to check if auction has ended
async function createCronJobForAutoEndAuction(auction) {
  try {
    const task = cron.schedule('*/1 * * * *', async () => {
      const currentTime = new Date(_.now());
      const endDate = new Date(auction.endAt);
      console.log('🤖🤖🤖', 'Checking Auction remaining time', auction);
      console.log('Current time:', toDateString(currentTime));
      console.log('End time:', toDateString(auction.endAt));
      if (currentTime >= endDate) {
        console.log('🤖', 'Auction has ended');
        const auctionEnded = await onAuctionEnded(
          auction.auctionId,
          auction.productId,
        );
        const serializedPostAuction = serializefullAction(auctionEnded);
        console.log(serializedPostAuction);
        sendEmail(serializedPostAuction.id);
        task.destroy();
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function sendNotiForNewProductInCategory(
  io,
  noti,
  activeAuctions,
  categoryId,
) {
  io.emit('askForUserId');
  const userId = await getFavouriteUserIdFromCategory(categoryId);
}

async function addProductToCategoryBusiness(data) {
  await addProductToCategory({
    categoryId: data.category,
    productId: data.productId,
    createdBy: data.byId,
    updatedBy: data.byId,
  });
}

export async function createNewProductBusiness(req, res) {
  const transaction = await db.sequelize.transaction();
  try {
    const io = req.app.get('socket');
    const { body } = req;
    body.createdBy = req.currentUser.id;
    body.updatedBy = req.currentUser.id;
    console.log(toDateString(body.endAt), toDateString(_.now()));
    if (new Date(body.endAt) < new Date(_.now())) {
      throw new AppError('End date muse be in the future');
    }
    const product = await createProduct(body, transaction);
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
    const newAuction = await createAuction(auction, transaction);
    if (!newAuction) {
      throw new AppError('Cannot start auction', 204);
    }
    const fullActionDetail = serializefullActionDetail(product, newAuction);

    // cronjob start here
    if (isValidDate(fullActionDetail.endAt)) {
      console.log('Create cronjob for this auction', fullActionDetail);
      await createCronJobForAutoEndAuction(fullActionDetail);
    }

    if (body.category) {
      const categoryId = await getCategoryId(body.category);
      const noti = await addProductToCategoryBusiness({
        category,
        productId: auction.productId,
        byId: body.createdBy,
      });
      if (noti) {
        const activeAuctions = req.app.get('activeAuctions');
        sendNotiForNewProductInCategory(io, noti, activeAuctions, categoryId);
      }
    }

    await transaction.commit();
    return await getProductWithId(fullActionDetail.productId);
  } catch (error) {
    await transaction.rollback();
    responseError(res, error);
    return null;
  }
}
