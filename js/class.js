// 模拟实现Object.create(不完整)

Object.create = Object.create || function (fn) {
  const temp = function () {};
  temp.prototype = fn.prototype;
  return new temp();
}