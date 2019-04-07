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

// 柯里化一般形式
function curring (fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
     // 注意这里，是重新命名了一个变量，如果使用args则会屏蔽掉上层的args，因为var会变量提升到函数顶部；但是使用let就没有这个问题了
    var _args = args.concat(args, [].slice.call(arguments));
    return fn.apply(null, _args);
  }
}

// 使用一般柯里化形式来执行
function add () {
	var args = [].slice.call(arguments);
	function _add () {
	args.push.apply(args, arguments);
	  return _add;
  }
	_add.toString = function () {
		return args.reduce(function (a, b) {
  		return a + b;
    });
  }
  return _add;
}

var val = curring(add);
val(1)(2)(3)(4)(5) + 10; // 25
val(1, 2, 3, 4) + 5; // 15
val(1, 2)(3, 4) + 5; // 15