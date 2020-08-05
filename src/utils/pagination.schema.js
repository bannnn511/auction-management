import * as Joi from '@hapi/joi';

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(0),
  pagesize: Joi.number().integer().min(0),
});
