import { pagination } from '../../../shared/helpers';

const { Categories } = require('../../../../models');

export async function getAllCategories(page, pagesize) {
  try {
    const { offset, limit } = pagination(page, pagesize);
    const data = await Categories.findAll({
      offset,
      limit,
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
