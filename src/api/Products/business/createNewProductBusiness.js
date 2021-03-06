import * as _ from 'lodash';
import { createProduct, getProductWithId } from '../database';
import { AppError } from '../../../utils/appError';
import { isValidDate, toDateString } from '../../../shared/helpers';
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
import { createNotification } from '../../Notifications/database/post-create-notification';

const cron = require('node-cron');
const db = require('../../../../models');

/**
 * Sends an email to annouced that the auctions has ended.
 *
 * @param {string} auctionId - Id the the ended auction.
 */
async function sendEmail(auctionId) {
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
}

/**
 * Updates buyerId in AuctionManagements table to whom has won the auction.
 *
 * @param {string} auctionId - Id of the ended auction.
 * @param {string} productId - Id of the product in this auction.
 * @return {Object} - updated info of the ended auction.
 */
async function onAuctionEnded(auctionId, productId) {
  const winningData = await getWinningHistoryFromAuctionWithAuctionId(
    auctionId,
  );
  if (!winningData) {
    throw new AppError('There is no winning data', 500, true);
  }

  winningData.productId = productId;
  winningData.auctionId = auctionId;
  const updatedAuction = await updateAuctionBuyerId(winningData);
  if (!updatedAuction) {
    throw new AppError('Cannot update winning Buyer', 500, true);
  }

  return updatedAuction;
}

/**
 * Create a cronjob to check when auction ended.
 * If the auction ends, update the AuctionManagements table.
 *
 * @param {Object} auction - The auction data.
 */
async function createCronJobForAutoEndAuction(auction) {
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
}

/**
 * Sends notifications to clients through socket.
 *
 * @param {Socket} io - The socket.
 * @param {[Object]} activeAuctions - User ID mapped with socket ID.
 * @param {Object} data - Data contains the category and category ID.
 */
async function sendNotiForNewProductInCategory(io, activeAuctions, data) {
  const userId = await getFavouriteUserIdFromCategory(data.categoryId);
  userId.forEach((user) => {
    const description = `There is a new product in your favourite category: ${data.category}`;
    io.to(activeAuctions[user.userId]).emit('notification', description);
    createNotification({ userId: user.userId, description });
  });
}

/**
 * Add product to a category.
 * Then notify users who like this category.
 *
 * @param {Request} req - Data sent from client request.
 * @param {Object} data - Data contains the category and category ID.
 * @param {Transaction} transaction
 */
async function addProductToCategoryBusiness(req, data, transaction) {
  const io = req.app.get('socket');
  const noti = await addProductToCategory(data, transaction);
  if (noti) {
    io.emit('askForUserId');
    const activeAuctions = req.app.get('activeAuctions');
    sendNotiForNewProductInCategory(io, activeAuctions, data);
  }
}

/**
 * Create new product + auctions + cronjobs.
 * Need transaction to assure atomicity.
 *
 * @export
 * @param {*} req - Request sent from clients.
 * @return {Object} - Return a Product instance.
 */
export async function createNewProductBusiness(req) {
  const transaction = await db.sequelize.transaction();
  try {
    const { body } = req;
    body.createdBy = req.currentUser.id;
    body.updatedBy = req.currentUser.id;
    const { category } = body;
    if (new Date(body.endAt) < new Date(_.now())) {
      throw new AppError('End date muse be in the future');
    }
    const product = await createProduct(body, transaction);
    if (!product) {
      throw new AppError('Cannot create product', 500, true);
    }

    product.description = req.body.description;
    product.endAt = req.body.endAt;

    const auction = {
      sellerId: _.get(product, 'createdBy'),
      productId: _.get(product, 'id'),
      description: _.get(product, 'description'),
      createdBy: _.get(product, 'createdBy'),
      updatedBy: _.get(product, 'updatedBy'),
      endAt: _.get(product, 'endAt'),
    };
    const newAuction = await createAuction(auction, transaction);
    if (!newAuction) {
      throw new AppError('Cannot start auction', 500, true);
    }
    const fullActionDetail = serializefullActionDetail(product, newAuction);

    // cronjob start here
    if (isValidDate(fullActionDetail.endAt)) {
      console.log('Create cronjob for this auction', fullActionDetail);
      await createCronJobForAutoEndAuction(fullActionDetail);
    }

    // send notification for user who favourited this category
    if (category) {
      const categoryId = await getCategoryId(body.category);
      if (!categoryId) {
        throw new AppError('This category does not exist', 500, true);
      }
      await addProductToCategoryBusiness(
        req,
        {
          categoryId,
          productId: product.id,
          byId: body.createdBy,
          category,
        },
        transaction,
      );
    }

    await transaction.commit();
    return await getProductWithId(fullActionDetail.productId);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
