import * as _ from 'lodash';
import { serializeBidProduct, serializeProducts } from '../product.serialize';
import { getProductWithId, updateProductPrice } from '../database';
import { getAuctionWithProductId } from '../../AuctionManagement/business';
import { AppError } from '../../../utils/appError';
import { serializeAuction } from '../../AuctionManagement/auction.serialize';
import { serializeAuctionHistory } from '../../AuctionHistories/history.serialize';
import { createAuctionHistory } from '../../AuctionHistories/business';
import { responseError } from '../../../shared/helpers';

export async function updateProductCurrentPriceBusiness(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    body.updatedBy = req.currentUser.id;
    body.id = id;
    const serializedBody = serializeBidProduct(body);

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
    return fullAuctionDetail;
  } catch (error) {
    responseError(res, error);
  }
}
