import { Router } from 'express';
import { login, register, logout } from './auth.controller';
import { authorization } from '../../shared/middleware/authorization';
import { validateBody } from '../../shared/middleware/validator';
import { AccountLoginSchema, AccountRegisterSchema } from './auth.schema';

const authRouter = Router();

authRouter.post('/login', validateBody(AccountLoginSchema), login);
authRouter.post('/register', validateBody(AccountRegisterSchema), register);
authRouter.get('/logout/', authorization, logout);

export { authRouter };
