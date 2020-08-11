import { pagination } from '../../../shared/helpers';

const { Categories } = require('../../../../models');

export function getAllCategories(page, pagesize) {
  try {
    const { offset, limit } = pagination(page, pagesize);
    const categories = Categories.findAll({
      offset,
      limit,
    });
    return categories;
  } catch (error) {
    console.log(error);
    return null;
  }
}
