import * as _ from 'lodash';

export function serializeAuctionFromProduct(product) {
  const auction = {
    sellerId: _.get(product, 'createdBy', ''),
    productId: _.get(product, 'id', ''),
    description: _.get(product, 'description', ''),
    createdBy: _.get(product, 'createdBy', ''),
    updatedBy: _.get(product, 'updatedBy', ''),
  };
  return auction;
}

export function serializefullActionDetail(product, auction) {
  const fullAuctionDetail = {
    sellerId: _.get(auction, 'sellerID', ''),
    productId: _.get(auction, 'productId', ''),
    productName: _.get(product, 'productName', ''),
    imgUrl: _.get(product, 'imgUrl', ''),
    description: _.get(auction, 'description', ''),
    currentPrice: _.get(product, 'currentPrice', 0),
    buyNowPrice: _.get(product, 'buyNowPrice', 1),
    endAt: _.get(product, 'endAt', _.now()),
  };
  return fullAuctionDetail;
}

export function serializefullAction(data) {
  const fullAuctionDetail = {
    sellerId: _.get(data, 'sellerID', ''),
    productId: _.get(data, 'productId', ''),
    productName: _.get(data, 'productName', ''),
    imgUrl: _.get(data, 'imgUrl', ''),
    description: _.get(data, 'description', ''),
    currentPrice: _.get(data, 'currentPrice', 0),
    buyNowPrice: _.get(data, 'buyNowPrice', 1),
    endAt: _.get(data, 'endAt', _.now()),
  };
  return fullAuctionDetail;
}

export function serializeAuction(auction) {
  const newAuction = {
    buyerId: _.get(auction, 'buyerId', ''),
    sellerId: _.get(auction, 'sellerID', ''),
    productId: _.get(auction, 'productId', ''),
  };
  return newAuction;
}

export function serializeAllAuctions(auctions) {
  const newAuctions = [];
  auctions.forEach((auction) => {
    newAuctions.push(serializeAuction(auction));
  });
  return newAuctions;
}
