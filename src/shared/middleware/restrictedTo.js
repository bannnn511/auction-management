import { responseError, responseSuccess } from '../helpers';

export function restrictedTo(role) {
  return (req, res, next) => {
    try {
      const { type } = req.currentUser;
      if (type === role) {
        console.log('😎😎😎', 'Access granted');
        next();
      } else {
        console.log(req.body);
        responseSuccess(res, { message: 'Authority denied' }, 403);
      }
    } catch (error) {
      responseError(res, error);
    }
  };
}
