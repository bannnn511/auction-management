import { Router } from 'express';
import { login, register, logout } from './auth.controller';
import { authentication } from '../../shared/middleware/authentication';
import { validateBody } from '../../shared/middleware/validator';
import { AccountLoginSchema, AccountRegisterSchema } from './auth.schema';
import { redisValidation } from '../../shared/middleware';

const authRouter = Router();

authRouter.post('/login', validateBody(AccountLoginSchema), login);
authRouter.post('/register', validateBody(AccountRegisterSchema), register);
authRouter.get('/logout', authentication, redisValidation, logout);

export { authRouter };
