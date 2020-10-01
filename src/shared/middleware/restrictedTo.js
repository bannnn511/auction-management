import chalk from 'chalk';
import { responseError } from '../helpers';

export function restrictedTo(role) {
  return (req, res, next) => {
    try {
      const { type } = req.currentUser;
      if (type === role) {
        console.log(chalk.cyan('Access granted'));
        next();
      } else {
        console.log(chalk.yellow('Access denied'));
        responseError(res, `Authority denied, you are not ${role}`, 403, true);
      }
    } catch (error) {
      next(error);
    }
  };
}
