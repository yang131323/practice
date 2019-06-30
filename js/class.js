import { isObject, isFunction } from './utils'

// 模拟实现Object.create(不完整)
Object.create = Object.create || function (fn) {
  if (!isObject(fn) && !isFunction(fn)) { throw new Error('arg should is a Object or Function!'); }
  const temp = function () {};
  temp.prototype = isFunction(fn) ? new fn() : fn;
  return new temp();
}