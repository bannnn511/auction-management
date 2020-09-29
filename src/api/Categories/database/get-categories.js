import { pagination } from '../../../shared/helpers';

const { Categories } = require('../../../../models');

export function getAllCategories(page, pagesize) {
  const { offset, limit } = pagination(page, pagesize);
  return Categories.findAll({
    offset,
    limit,
  });
}
