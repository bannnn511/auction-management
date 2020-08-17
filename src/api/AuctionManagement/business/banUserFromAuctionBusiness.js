import { AppError } from '../../../utils/appError';
import { Email } from '../../../utils/email';
import { getLoginUserById } from '../../Auth/database';

const { banUserFromAuctions, getAuctionById } = require('../database');
const { responseError } = require('../../../shared/helpers');

export async function banUserFromAuctionBusiness(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    body.createdBy = req.currentUser.id;
    body.updatedBy = req.currentUser.id;
    body.auctionId = id;
    const checkAuction = await getAuctionById(id);
    if (checkAuction.sellerId !== req.currentUser.id) {
      throw new AppError('You are not the seller who create this auction');
    }
    const data = await banUserFromAuctions(req.body);
    if (!data) {
      throw new AppError('Cannot ban user');
    }
    const user = await getLoginUserById(data.userId);
    const email = new Email(
      process.env.MY_EMAIL,
      user.email,
      'Ban from auction',
      `You have been banned from this auction ${data.auctionId}`,
    );
    email.send();
    return user;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
