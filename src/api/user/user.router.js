import { Router } from 'express';
import { getAllUsers, createNewUser } from './user.controller';
import { UserCreateSchema } from './user.schema';
import { commonValidator, validateBody } from '../../shared';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', validateBody(UserCreateSchema), createNewUser);

export { userRouter };
