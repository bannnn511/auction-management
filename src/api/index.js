import { Router } from 'express';
import { buyersRouter } from './Buyers/buyers.router';
import { authRouter } from './Auth/auth.router';
import { productsRouter } from './Products/product.router';
import { auctionRouter } from './AuctionManagement/auction.router';
import { categoriesRouter } from './Categories/category-router';
import { historiesRouter } from './AuctionHistories/history.router';
import { ratingsRouter } from './Ratings/rating.router';
import { favouriteRouter } from './Favourites/favourite-router';
import { notificationRouter } from './Notifications/notifications.router';

const apiRouter = Router();

// log request
apiRouter.use('*', (req, res, next) => {
  console.log('📧 📧 📧', { 'Request body': req.body });
  next();
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/buyers', buyersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/auctions', auctionRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/histories', historiesRouter);
apiRouter.use('/ratings', ratingsRouter);
apiRouter.use('/favourites', favouriteRouter);
apiRouter.use('/notifications', notificationRouter);

export { apiRouter };
