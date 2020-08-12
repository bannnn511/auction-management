import * as _ from 'lodash';

export function serializeCategory(category) {
  if (category) {
    const data = {
      id: _.get(category, 'id', ''),
      categoryName: _.get(category, 'categoryName', ''),
      createdBy: _.get(category, 'createdBy', ''),
      updatedBy: _.get(category, 'updatedBy', ''),
    };
    return data;
  }
  return null;
}

export function serializeAllCategories(categories) {
  if (categories) {
    const data = [];
    categories.forEach((category) => {
      data.push(serializeCategory(category));
    });
    return data;
  }
  return null;
}
