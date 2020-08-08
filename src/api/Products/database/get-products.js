import { pagination } from '../../../shared/helpers';

const { Products } = require('../../../../models');

export function getAllProducts(page, pagesize) {
  try {
    const { offset, limit } = pagination(page, pagesize);
    const products = Products.findAll({
      offset,
      limit,
    });
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
}
