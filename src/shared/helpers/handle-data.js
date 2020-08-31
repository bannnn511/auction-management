export function safeParseFloat(input, defaultValue) {
  if (!input || typeof input === 'number') {
    return input || defaultValue;
  }

  return parseFloat(input);
}

export function safeParseInt(input, defaultValue) {
  if (!input || typeof input === 'number') {
    return Math.floor(input || defaultValue);
  }

  return parseInt(input, 0);
}

export function isEmptyObject(input) {
  return (
    !input ||
    (typeof input === 'object' &&
      !Array.isArray(input) &&
      Object.keys(input).length === 0)
  );
}

export function safeParseJSON(input, defaultValue = {}) {
  const result = typeof input === 'string' ? JSON.parse(input) : input;

  return result || defaultValue;
}

export function toISOString(input) {
  if (!input) {
    return null;
  }

  return typeof input === 'string' ? input : input.toISOString();
}

export function toDateString(input) {
  if (!input) {
    return null;
  }
  input = new Date(input);

  return input.toLocaleString();
}

export function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export function getToken(req) {
  if (req.header('Authorization')) {
    return req.header('Authorization').replace('Bearer', '').replace(/\s/g, '');
  }
  return null;
}
