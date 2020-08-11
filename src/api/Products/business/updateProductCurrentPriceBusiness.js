import * as _ from 'lodash';
import { getProductWithId, updateProductPrice } from '../database';
import { getAuctionWithProductId } from '../../AuctionManagement/database';
import { AppError } from '../../../utils/appError';
import { serializeAuctionHistoryFromProductAndAuction } from '../../AuctionHistories/history.serialize';
import { createAuctionHistory } from '../../AuctionHistories/database';
import { responseError } from '../../../shared/helpers';

export async function updateProductCurrentPriceBusiness(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    body.updatedBy = req.currentUser.id;
    body.id = id;

    // check product exist
    const checkProduct = await getProductWithId(id);
    if (!checkProduct) {
      throw new AppError('Product does not exist', 204);
    }

    // check auction exist
    const auction = await getAuctionWithProductId(id);
    if (!auction) {
      throw new AppError('There is no auction with this product', 204);
    }

    // check if bidding price is valid
    if (checkProduct.currentPrice >= body.price) {
      throw new AppError(
        'Bidding price must be higher than current price',
        406,
      );
    }

    // check if bidding time is till valid
    if (auction.endAt <= new Date(_.now())) {
      throw new AppError('Bidding time has expired', 204);
    }

    const newProduct = await updateProductPrice(body);
    if (!newProduct) {
      throw new AppError('Bid product failed', 204);
    }

    const fullAuctionDetail = serializeAuctionHistoryFromProductAndAuction(
      newProduct,
      auction,
    );

    // create auction history
    const history = await createAuctionHistory(fullAuctionDetail);
    if (!history) {
      throw new AppError('Cannot create Auction History', 204);
    }
    return await getProductWithId(newProduct.id);
  } catch (error) {
    responseError(res, error);
  }
}
