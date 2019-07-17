function isNull  (val) {
  return val === null;
}

function isNaN  (val) {
  return val !== val; // Number.isNaN(val)
}

function isUndefined  (val) {
  return val === undefined;
}

function isFunction  (val) {
  return typeof val === 'function';
}

function isArray  (val) {
  return Array.isArray(val);
}

function isBoolean  (val) {
  return typeof val === 'boolean';
}

function isNumber  (val) {
  return typeof val === 'number';
}

function isString  (val) {
  return typeof val === 'string';
}

function isSymbol  (val) {
  return typeof val === 'symbol';
}

function isNullUndefinedNaN (val) {
  return isNull(val) || isUndefined(val) || isNaN(val);
}

function isObject  (val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

function isDate (val) {
  return Object.prototype.toString.call(val) === '[object Date]';
}

function isRegEXp (val) {
  return Object.prototype.toString.call(val) === '[object RegExp]';
}

function objGet (obj, path, def = undefined) {
  if (!isString(path) || !path) { return obj; }
  try {
    path = path.split('.');
    path.forEach((val) => {
      obj = obj[val];
    });
    return obj;
  } catch (e) {
    return def;
  }
}

function get (obj, ...args) {
  return args.map((val) => (new Function('obj', 'def', `try {
    return obj.${val};
  } catch (e) {
    return def;
  }`))(obj, undefined));
}

module.exports = {
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isNaN,
  isNull,
  isNullUndefinedNaN,
  isNumber,
  isObject,
  isRegEXp,
  isUndefined,
  isString,
  isSymbol,
  objGet
}