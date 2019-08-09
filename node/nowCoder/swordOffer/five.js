/**
 * 5. 用两个栈实现队列
 * 解题思路：一个栈用来写入，另一个栈用来输出，但是在输出的时候一定要把写入的那个栈清空
 * @param {Number} node 
 */
const stackOne = [], stackTwo = [];
function push(node) {
  stackOne.push(node);
}
function pop() {
  if (stackTwo.length <= 0 && stackOne.length <= 0) {
    return null;
  } else if (stackTwo.length <= 0) {
    const len = stackOne.length;
    for (let i = 0; i < len; i++) {
      stackTwo.push(stackOne.pop());
    }
  }
  return stackTwo.pop();
}