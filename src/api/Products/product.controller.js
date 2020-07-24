import { responseError, responseSuccess } from '../../shared/helpers';
import {
  createProduct,
  getAllProducts,
  getProductWithId,
} from './business/index';
import {
  serializeProducts,
  serializeAllProducts,
  serializeBidProduct,
} from './product.serialize';
import {
  serializeAuctionFromProduct,
  serializefullActionDetail,
  serializeAuction,
} from '../AuctionManagement/auction.serialize';
import { createAuction } from '../AuctionManagement/business/index';
import { AppError } from '../../utils/appError';
import { updateProductPrice } from './business/post-update-product-price';
import { getAuctionWithProductId } from '../AuctionManagement/business/get-auction-with-product-id';
import { createAuctionHistory } from '../AuctionHistories/business/post-create-auction-history';

export async function getProducts(req, res) {
  try {
    const product = await getAllProducts();
    const data = serializeAllProducts(product);
    console.log(data);

    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

export async function createNewProduct(req, res) {
  try {
    req.body.createdBy = req.currentUser.id;
    req.body.updatedBy = req.currentUser.id;
    const body = serializeProducts(req.body);
    const product = await createProduct(body);
    if (!product) {
      throw new AppError('Cannot create product', 204);
    }
    const data = serializeProducts(product);
    Object.assign(data, req.body.description);
    console.log('✨✨✨ Product datas', data);

    const auction = serializeAuctionFromProduct(data);
    const newAuction = await createAuction(auction);
    if (!newAuction) {
      throw new AppError('Cannot start auction', 204);
    }
    console.log('👌👌👌 Auction data', newAuction.dataValues);

    const fullActionDetail = serializefullActionDetail(data, newAuction);
    console.log('Full Auction Detail', fullActionDetail);
    responseSuccess(res, fullActionDetail);
  } catch (error) {
    responseError(res, error);
  }
}

export async function updateProductCurrentPrice(req, res) {
  try {
    req.body.updatedBy = req.currentUser.id;
    const serializeBody = serializeBidProduct(req.body);
    const checkProduct = await getProductWithId(serializeBody);
    if (!checkProduct) {
      res.status(204).send('Product does not exist');
    }
    const currentProduct = serializeProducts(checkProduct);
    console.log({ currentProduct });

    if (currentProduct.currentPrice >= serializeBody.price) {
      res.status(406).send('Bidding price must higher than current price');
    }

    const auction = await getAuctionWithProductId(currentProduct);
    if (!auction) {
      res.status(204).send('There is no auction with this product');
    }
    const serializedAuction = serializeAuction(auction);
    console.log({ currnetAuction: serializedAuction });

    const newProduct = await updateProductPrice(serializeBody);
    if (!newProduct) {
      res.status(204).send('Bid product failed');
    }
    const serializedProduct = serializeProducts(newProduct);
    const fullAuctionDetail = {
      userId: serializeBody.id,
      auctionId: serializedAuction.id,
      price: serializedProduct.currentPrice,
      createdBy: serializedProduct.createdBy,
      updatedBy: serializedProduct.updatedBy,
    };
    const history = await createAuctionHistory(fullAuctionDetail);
    if (!history) {
      res.status(204).send('Cannot create Auction History');
    }
    responseSuccess(res, newProduct);
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
}
