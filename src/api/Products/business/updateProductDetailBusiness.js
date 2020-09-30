import * as _ from 'lodash';
import { getProductWithId, updateProductDetail } from '../database';
import { AppError } from '../../../utils/appError';
import { getAuctionWithProductId } from '../../AuctionManagement/database';

export async function updateProductDetailBusiness(req) {
  const { id } = req.params;
  const { body } = req;
  body.updatedBy = req.currentUser.id;
  body.productId = id;

  // check product exist
  const checkProduct = await getProductWithId(id);
  if (!checkProduct) {
    throw new AppError('Product does not exist', 500, true);
  }

  if (body.updatedBy !== checkProduct.createdBy) {
    throw new AppError('You are not this product seller', 500, true);
  }
  // check auction exist
  const checkAuction = await getAuctionWithProductId(id);
  if (!checkAuction) {
    throw new AppError('There is no auction with this product', 500, true);
  }

  // check if bidding time is till valid
  if (checkAuction.endAt <= new Date(_.now())) {
    throw new AppError('Auction end date is invalid', 500, true);
  }

  const newProduct = await updateProductDetail(
    body,
    checkProduct,
    checkAuction,
  );
  if (!newProduct) {
    throw new AppError('Update product detail failed', 500, true);
  }

  return newProduct;
}
