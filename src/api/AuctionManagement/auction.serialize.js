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
    sellerId: _.get(auction, 'sellerId', ''),
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
    sellerId: _.get(data, 'sellerId', ''),
    productId: _.get(data, 'productId', ''),
    productName: _.get(data, 'products.productName', ''),
    imgUrl: _.get(data, 'products.imgUrl', ''),
    description: _.get(data, 'description', ''),
    currentPrice: _.get(data, 'products.currentPrice', 0),
    buyNowPrice: _.get(data, 'products.buyNowPrice', 1),
    endAt: _.get(data, 'endAt', _.now()),
  };
  return fullAuctionDetail;
}

export function serializeAuction(auction) {
  const newAuction = {
    id: _.get(auction, 'id', ''),
    buyerId: _.get(auction, 'buyerId', ''),
    sellerId: _.get(auction, 'sellerId', ''),
    productId: _.get(auction, 'productId', ''),
    endAt: _.get(auction, 'endAt', _.now()),
  };
  return newAuction;
}

export function serializeAllAuctions(auctions) {
  const newAuctions = [];
  auctions.forEach((auction) => {
    newAuctions.push(serializefullAction(auction));
  });
  return newAuctions;
}
