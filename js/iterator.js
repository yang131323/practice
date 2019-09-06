/**
 * 使用原生js实现对象的迭代器
 */
function iterator() {
	const self = this;
	const keys = Object.keys(self);
	const len = keys.length;
	let index = 0;
	function next () {
      if (index === len) {
      return {
        value: undefined,
        done: true
      }
    }
    return {
      value: self[keys[index++]],
      done: false
    }
  }
  return {next};
}

/**
 * 利用generator函数构造对象的迭代器
 */
function *iteratorG() {
  const self = this;
	const keys = Object.keys(self);
	for (const x of keys) {
    yield self[x];
  }
}