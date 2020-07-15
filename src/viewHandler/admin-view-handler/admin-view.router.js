import { Router } from 'express';
import { getOverviewAdmin, getAllUsers } from './admin-view.controller';

const adminViewRouter = Router();

adminViewRouter.get('/', getOverviewAdmin);
adminViewRouter.get('/users', getAllUsers);

export { adminViewRouter };
