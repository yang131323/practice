export function isNull  (val) {
  return val === null;
}

export function isNaN  (val) {
  return val !== val; // Number.isNaN(val)
}

export function isUndefined  (val) {
  return val === undefined;
}

export function isFunction  (val) {
  return typeof val === 'function';
}

export function isArray  (val) {
  return Array.isArray(val);
}

export function isBoolean  (val) {
  return typeof val === 'boolean';
}

export function isNumber  (val) {
  return typeof val === 'number';
}

export function isString  (val) {
  return typeof val === 'string';
}

export function isSymbol  (val) {
  return typeof val === 'symbol';
}

export function isNullUndefinedNaN (val) {
  return isNull(val) || isUndefined(val) || isNaN(val);
}

export function isObject  (val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

export function isDate (val) {
  return Object.prototype.toString.call(val) === '[object Date]';
}

export function isRegEXp (val) {
  return Object.prototype.toString.call(val) === '[object RegExp]';
}