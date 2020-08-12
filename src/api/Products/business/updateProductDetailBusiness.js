import * as _ from 'lodash';
import { responseError } from '../../../shared/helpers';
import { getProductWithId, updateProductDetail } from '../database';
import { AppError } from '../../../utils/appError';
import { getAuctionWithProductId } from '../../AuctionManagement/database';

export async function updateProductDetailBusiness(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    body.updatedBy = req.currentUser.id;
    body.productId = id;

    // check product exist
    const checkProduct = await getProductWithId(id);
    if (!checkProduct) {
      throw new AppError('Product does not exist', 204);
    }

    if (body.updatedBy !== checkProduct.createdBy) {
      throw new AppError('You are not this product seller', 406);
    }
    // check auction exist
    const checkAuction = await getAuctionWithProductId(id);
    if (!checkAuction) {
      throw new AppError('There is no auction with this product', 204);
    }

    // check if bidding time is till valid
    if (checkAuction.endAt <= new Date(_.now())) {
      throw new AppError('Auction end date is invalid', 204);
    }

    const newProduct = await updateProductDetail(
      body,
      checkProduct,
      checkAuction,
    );
    if (!newProduct) {
      throw new AppError('Update product detail failed', 204);
    }

    return newProduct;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
