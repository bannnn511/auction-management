import { responseSuccess } from '../../shared/helpers';
import { serializeUser } from './auth.serialize';
import { loginBusiness, logoutBusiness, registerBusiness } from './business';

export async function login(req, res, next) {
  try {
    const token = await loginBusiness(req, res);
    responseSuccess(res, token);
  } catch (error) {
    next(error);
  }
}

export async function register(req, res, next) {
  try {
    const data = await registerBusiness(req, res);
    const serializedData = serializeUser(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    await logoutBusiness(req, res);
    const mess = 'Logout successfully';
    responseSuccess(res, mess);
  } catch (error) {
    next(error);
  }
}
