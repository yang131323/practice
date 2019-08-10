/**
 * 8. 跳台阶
 * 解题思路：可以很容易的看出来每一次都可以调1阶或者2阶，那么每一次跳的可能性是这两种之和，如果现在有n个台阶，从第n个台阶开始跳的话，f(n)跳一步存在的可能性就是f(n - 1)，
 * f(n)跳两步存在的可能性就是f(n - 2)，以此类推直到台阶为一和二时就可以返回结果了所以最终发现f(n) = f(n - 1) + f(n - 2)，就是斐波拉契数列的规则
 * 
 * @param {Number} number 
 */
function jumpFloor(number, one = 1, two = 2) {
  if (number <= 1) { return number; }
  if (number === 2) { return two; }
  return jumpFloor(number - 1, two, one + two);
}

for (let i = 0; i <= 10; i++) {
  console.log(jumpFloor(i));
}