/**
 * 7. 斐波那契数列
 * 解题思路：斐波那契数列已经是很熟悉的一个数学题了，规则为：Fn = Fn-1 + Fn - 2，实现这个很简单，就是模拟这个算数过程，但是我这里是想构造成尾递归优化的形式
 * @param {Number} n 
 */
function Fibonacci(n, one = 1, two = 1) {
  if (n <= 1) { return n; }
  if (n === 2) { return two; }
  return Fibonacci(n - 1, two, one + two);
}

for (let i = 0; i <= 10; i++) {
  console.log(Fibonacci(i));
}