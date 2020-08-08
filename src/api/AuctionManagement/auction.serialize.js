import * as _ from 'lodash';
import { toDateString, safeParseFloat } from '../../shared/helpers';

export function serializeAuctionFromProduct(product) {
  const auction = {
    sellerId: _.get(product, 'createdBy', ''),
    productId: _.get(product, 'id', ''),
    description: _.get(product, 'description', ''),
    createdBy: _.get(product, 'createdBy', ''),
    updatedBy: _.get(product, 'updatedBy', ''),
    endAt: _.get(product, 'endAt', ''),
  };
  return auction;
}

export function serializefullActionDetail(product, auction) {
  const fullAuctionDetail = {
    auctionId: _.get(auction, 'id', ''),
    sellerId: _.get(auction, 'sellerId', ''),
    productId: _.get(auction, 'productId', ''),
    productName: _.get(product, 'productName', ''),
    imgURL: _.get(product, 'imgURL', ''),
    description: _.get(auction, 'description', ''),
    currentPrice: _.get(product, 'currentPrice', 0),
    buyNowPrice: _.get(product, 'buyNowPrice', 1),
    endAt: _.get(auction, 'endAt', _.now()),
  };
  return fullAuctionDetail;
}

export function serializefullAction(data) {
  const fullAuctionDetail = {
    id: _.get(data, 'id', ''),
    buyerId: _.get(data, 'buyerId', ''),
    sellerId: _.get(data, 'sellerId', ''),
    productId: _.get(data, 'productId', ''),
    productName: _.get(data, 'products.productName', ''),
    imgURL: _.get(data, 'products.imgURL', ''),
    description: _.get(data, 'description', ''),
    currentPrice: safeParseFloat(_.get(data, 'products.currentPrice', 0)),
    buyNowPrice: safeParseFloat(_.get(data, 'products.buyNowPrice', 1)),
    endAt: toDateString(_.get(data, 'endAt', _.now())),
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

export function serializeAuctionHistory(auction) {
  return {
    userId: _.get(auction, 'userId', ''),
    price: _.get(auction, 'price', ''),
    fullname: _.get(auction, 'fullname', ''),
  };
}

export function serializeAllBuyerInAuction(auctions) {
  const buyers = [];
  auctions.forEach((auction) => {
    buyers.push(serializeAuctionHistory(auction));
  });
  return buyers;
}

export function serializeAuctionSortByBiddingCount(auctions) {
  const data = [];
  auctions.forEach((auction) => {
    data.push({
      productId: _.get(auction, 'product_id', ''),
      count: _.get(auction, 'count', 0),
      productName: _.get(auction, 'product_name', ''),
      imgUrl: _.get(auction, 'img_url', ''),
      currentPrice: _.get(auction, 'current_price', 0),
      buyNowPrice: _.get(auction, 'buy_now_price', 0),
      endAt: _.get(auction, 'end_at', ''),
    });
  });
  return data;
}
