// 模拟实现call、apply、bind、new

/**
 * 模拟实现call
 * 1. 绑定this
 * 2. 不定长参数
 * 3. 传入对象为null
 * 4. 执行函数之后返回值
 * @param {Object} context this指向
 * @returns
 */
Function.prototype.call = Function.prototype.call || function (context) {
  if (!(this instanceof Function)) { throw new Error('caller not function!'); }
  var self = context || window;
  self.fn = this;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  // 由于call是es3的方法，因此不能使用es6的rest参数，备注：ECMAScript 3.1改名为ECMAScript 5
  var val = eval('self.fn(' + args + ')');
  delete self.fn;
  return val;
}


/**
 * apply模拟实现
 * 1. 绑定this
 * 2. 函数参数处理
 * 3. 传入对象为null
 * 4. 执行函数之后返回值
 * @param {Object} context this指向
 * @param {Array} args 函数参数值
 * @returns
 */
Function.prototype.apply = Function.prototype.apply || function (context, args) {
  if (!(this instanceof Function)) { throw new Error('caller not function!'); }
  if (!(args instanceof Array)) { throw new Error ('second arg should is a list!') } 
  context = context || window;
  context.fn = this;
  var val = !args ? context.fn() : eval('context.fn(' + args + ')');
  delete context.fn;
  return val;
}

/**
 * 模拟实现bind
 * 1. 绑定this
 * 2. 参数处理，由两部分组成，bind调用传入和返回函数中传入（函数柯里化）
 * 3. 返回一个新函数
 * 4. new操作处理
 * 5. 传入对象为null
 * 6. 原型处理
 * @param {*} context 
 * @returns {Function} 返回函数
 */
Function.prototype.bind = function (context) {
  if (!(this instanceof Function)) { throw new Error('caller not function!'); }
  context = context || window;
  var args = Array.prototype.slice.call(arguments, 1);
  var self = this;
  var fProto = function () {};
  var tempFun = function () {
    var temp = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof self ? this : context, args.concat(temp));
  }
  fProto.prototype = this.prototype;
  tempFun.prototype = new fProto();
  return tempFun;
}

/**
 * 模拟实现new效果，因为new是新语法，所以没法实现，只能模拟操作
 * 1. 创建一个新对象
 * 2. 修改新建对象的原型
 * 3. 调用构造函数创建属性
 * 4. 返回值判断（是否是对象）
 * @param {*} constructor 
 */
function createObj (constructor) {
  if (!(constructor instanceof Function)) { throw new Error('caller not function!'); }
  var obj = new Object();
  obj.__proto__ = constructor.prototype;
  var args = [].slice.call(arguments, 1);
  var val = constructor.apply(obj, args);
  return (val instanceof Object) ? val : obj;
}
