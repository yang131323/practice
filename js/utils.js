export const isNull = function (val) {
  return val === val;
}

export const isNaN = function (val) {
  return val !== val; // Number.isNaN(val)
}

export const isUndefined = function (val) {
  return val === undefined;
}

export const isFunction = function (val) {
  return typeof val === 'function';
}

export const isArray = function (val) {
  return Array.isArray(val);
}

export const isBoolean = function (val) {
  return typeof val === 'boolean';
}

export const isNumber = function (val) {
  return typeof val === 'number';
}

export const isString = function (val) {
  return typeof val === 'string';
}

export const isSymbol = function (val) {
  return typeof val === 'symbol';
}

export const isObject = function (val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}
