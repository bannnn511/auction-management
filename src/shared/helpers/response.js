import * as _ from 'lodash';
import chalk from 'chalk';

const util = require('util');

export function responseSuccess(res, data, status) {
  if (data) {
    console.log(
      chalk.greenBright(
        util.inspect(
          { data, total: _.defaultTo(data.length, 1) },
          { showHidden: false, depth: null },
        ),
      ),
    );
    return res
      .status(_.defaultTo(status, 200))
      .set({ 'x-total-count': _.defaultTo(data.length, 1) })
      .json(data);
  }
  return null;
}

export function responseError(res, error) {
  console.error(
    chalk.yellow(util.inspect({ error }, { showHidden: false, depth: null })),
  );
  return res.status(error.status || 400).json({ error });
}
