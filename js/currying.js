// 编写add函数达到以下要求
// add(1)(2)(3) = 6
// add(1, 2, 3)(4) = 10
// add(1)(2)(3)(4)(5) = 15

// 使用arguments版本
function add () {
  var arg = [].slice.call(arguments);
  var _temp = function () {
    [].push.apply(arg, [].slice.call(arguments));
    return _temp;
  }
  _temp.toString = function () {
    return arg.reduce(function (a, b) {
      return a + b;
    })
  }
  return _temp;
}

// 使用rest参数版本
function add (...args) {
  var _temp = function (...rest) {
    args.push(...rest);
    return _temp;
  }
  _temp.toString = function () {
    return args.reduce(function (a, b) {
      return a + b;
    })
  }
  return _temp;
}