import { responseError } from '../helpers';

export function restrictedTo(role) {
  return (req, res, next) => {
    try {
      const { type } = req.currentUser;
      if (type === role) {
        console.log('😎😎😎', 'Access granted');
        next();
      } else {
        console.log(req.body);
        res.status(403).send('Authority denied');
      }
    } catch (error) {
      responseError(res, error);
    }
  };
}
