/**
 * 原生js传入基本类型会将其转为相应的对象类型，并不会报错
 * @param {Object} obj 
 */
function call (obj) {
  if (typeof obj !== 'object') { throw new TypeError('except a Object, but get a ' + typeof obj); } // 原生实现是可以不为对象的
  obj = obj || window;
  const args = [].slice.call(arguments, 1);
  obj['_fn'] = this;
  const result = eval(`obj['_fn'](${args})`);
  delete obj['_fn'];
  return result;
}

function apply (obj) {
  if (typeof obj !== 'object') { throw new TypeError('except a Object, but get a ' + typeof obj); }
  obj = obj || window;
  const args = arguments[1] || [];
  obj['_fn'] = this;
  const result = eval('obj[\'_fn\'](args.join(', '))');
  delete obj['_fn'];
  return result;
}

/**
 * 需要注意的就是使用new来调用bind之后的函数
 * @param {Object} context 
 */
function bind (context) {
  if (typeof this !== 'function') { throw new TypeError('except a Object, but get a ' + typeof this); }
  let args = [].slice.call(arguments, 1);
  context = context || window;
  const self = this;
  function fn() {
    args = args.concat([].slice.call(arguments));
    if (this instanceof fn) {
      return eval('(new self(args.join(\', \')))');
    }
    return self.apply(context, args);
  }
  return fn;
}