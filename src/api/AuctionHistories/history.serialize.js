import * as _ from 'lodash';
import { safeParseInt } from '../../shared/helpers';

export function serializeAuctionHistoryFromProductAndAuction(product, auction) {
  return {
    userId: _.get(product, 'updatedBy', ''),
    auctionId: _.get(auction, 'id', ''),
    price: safeParseInt(product.currentPrice, 0),
    createdBy: _.get(product, 'createdBy', ''),
    updatedBy: _.get(product, 'updatedBy', ''),
  };
}

export function serializeAuctionHistory(auction) {
  return {
    auctionId: _.get(auction, 'auction_managements.id', ''),
    price: _.get(auction, 'price', 0),
    buyerId: _.get(auction, 'auction_managements.buyerId', ''),
    sellerId: _.get(auction, 'auction_managements.sellerId', ''),
    description: _.get(auction, 'auction_managements.description', 0),
    endAt: _.get(auction, 'auction_managements.endAt', ''),
  };
}
