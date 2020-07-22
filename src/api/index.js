import { Router } from 'express';
import { buyersRouter } from './Buyers/buyers.router';
import { authRouter } from './Auth/auth.router';
import { productsRouter } from './Products/product.router';

const apiRouter = Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/buyers', buyersRouter);
apiRouter.use('/products', productsRouter);

export { apiRouter };
