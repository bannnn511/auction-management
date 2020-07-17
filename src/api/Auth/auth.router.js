import { Router } from 'express';
import { login, register } from './auth.controller';
import { authentication } from '../../shared/middleware/authentication';
import { validateBody } from '../../shared/middleware/validator';
import { AccountLoginSchema, AccountRegisterSchema } from './auth.schema';

const authRouter = Router();

authRouter.get('/login', validateBody(AccountLoginSchema), login);
authRouter.post('/register', validateBody(AccountRegisterSchema), register);
// authRouter.get('/logout', authorization, logout);

export { authRouter };
