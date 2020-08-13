import { responseError, responseSuccess } from '../../shared/helpers';
import { serializeUser } from './auth.serialize';
import { loginBusiness, logoutBusiness, registerBusiness } from './business';

export async function login(req, res) {
  try {
    const token = await loginBusiness(req, res);
    responseSuccess(res, token);
  } catch (error) {
    responseError(res, error);
  }
}

export async function register(req, res) {
  try {
    const data = await registerBusiness(req, res);
    const serializedData = serializeUser(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}

export async function logout(req, res) {
  try {
    const data = await logoutBusiness(req, res);
    const serializedData = serializeUser(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}
