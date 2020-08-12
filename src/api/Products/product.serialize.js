import * as _ from 'lodash';
import { safeParseFloat } from '../../shared/helpers';

export function serializeProducts(product) {
  if (product) {
    const data = {
      id: _.get(product, 'id', ''),
      productName: _.get(product, 'productName', ''),
      imgURL: _.get(product, 'imgURL', ''),
      currentPrice: safeParseFloat(product.currentPrice, 0),
      buyNowPrice: safeParseFloat(product.buyNowPrice, 0),
      createdBy: _.get(product, 'createdBy', ''),
      updatedBy: _.get(product, 'updatedBy', ''),
    };
    return data;
  }
  return null;
}

export function serializeAllProducts(products) {
  if (products) {
    const data = [];
    products.forEach((product) => {
      data.push(serializeProducts(product));
    });
    return data;
  }
  return null;
}

export function serializeBidProduct(product) {
  if (product) {
    return {
      id: _.get(product, 'id'),
      price: _.get(product, 'price'),
      updatedBy: _.get(product, 'updatedBy', ''),
    };
  }
  return null;
}
