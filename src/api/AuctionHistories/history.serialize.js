import * as _ from 'lodash';

export function serializeAuctionHistory(buyer, product, auction) {
  return {
    userId: _.get(buyer, 'updatedBy', ''),
    auctionId: _.get(auction, 'id', ''),
    price: _.get(product, 'currentPrice', 0),
    createdBy: _.get(product, 'createdBy', ''),
    updatedBy: _.get(product, 'updatedBy', ''),
  };
}

export function serializedAuctionHistory(auction) {
  return {
    auctionId: _.get(auction, 'auction_managements.id', ''),
    price: _.get(auction, 'price', 0),
    buyerId: _.get(auction, 'auction_managements.buyerId', ''),
    sellerId: _.get(auction, 'auction_managements.sellerId', ''),
    description: _.get(auction, 'auction_managements.description', 0),
    endAt: _.get(auction, 'auction_managements.endAt', ''),
  };
}
