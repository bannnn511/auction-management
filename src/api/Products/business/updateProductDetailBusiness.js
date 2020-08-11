import * as _ from 'lodash';
import { responseError } from '../../../shared/helpers';

export async function updateProductDetailBusiness(req, res) {
  try {
    const { body } = req;
    body.updatedBy = req.currentUser.id;
    if (body.endAt <= new Date(_.now())) {
      throw new AppError('End date is not valid');
    }
  } catch (error) {
    responseError(res, error);
  }
}
