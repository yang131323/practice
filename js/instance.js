/**
 * 模拟实现instance方法，原理如下：
 * A instance B是在A的原型链上层层查找，是否能够找到与
 * B.prototype相等的值则返回true，如果查找到最顶层
 * （Object.prototype.__proto__ 或者 null ）还未找到则返回false
 * @param {Object|Function} sub 
 * @param {Object|Function} sup 
 */
function instance (sub, sup) {
  let proto = sub.__proto__;
  let supProto = sup.prototype;
  let result = false;
  while (proto) {
    if (proto === supProto) {
      result = true;
      break;
    }
    proto = proto.__proto__;
  }
  return result;
}