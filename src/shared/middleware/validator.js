const Joi = require('@hapi/joi');
const { responseError } = require('../helpers');

function commonValidator(schema, key, options) {
  return async (req, res, next) => {
    try {
      const value = req[key];
      await validateSchema(value, schema, options);

      return next();
    } catch (error) {
      console.log('error', error);
      return responseError(res, error);
    }
  };
}

export function validateSchema(value, schema, options) {
  return new Promise((resolve, reject) => {
    return schema
      .validateAsync(value, options)
      .then(() => {
        return resolve(true);
      })
      .catch((errors) => {
        const firstError = errors.details[0];
        const error = {
          code: firstError.type,
          message: firstError.message,
        };

        return reject(error);
      });
  });
}

export function validateParams(schema, options) {
  return commonValidator(schema, 'params', options);
}

export function validateBody(schema, options) {
  return commonValidator(schema, 'body', options);
}

export function validateQuery(schema, options) {
  return commonValidator(schema, 'query', {
    ...options,
    allowUnknown: true,
  });
}

export function validateHeader(schema, options) {
  return commonValidator(schema, 'headers', options);
}
