import { Router } from 'express';
import { buyersRouter } from './Buyers/buyers.router';
import { authRouter } from './Auth/auth.router';

const apiRouter = Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/buyers', buyersRouter);

export { apiRouter };
