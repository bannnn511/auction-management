import { defaultLimit } from './constant';
import { safeParseInt } from './handle-data';

export function pagination(page, pagesize) {
  const offset = safeParseInt(
    (page - 1 >= 0 ? page - 1 : page) * pagesize,
    defaultLimit.OFFSET,
  );
  const limit = safeParseInt(pagesize, defaultLimit.LIMIT);
  return { offset, limit };
}
