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
