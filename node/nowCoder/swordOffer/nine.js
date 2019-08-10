/**
 * 9. 变态跳台阶
 * 解体思路：我这里使用的是模拟整个过程，也就是每次都有n种选择，然后层层选择，但是这个效率应该是比较低的，我看到一个大佬的的分析，感觉真的很不错，我可能缺少就是这种分析能力，
 * 类似于跳台阶的第一个问题，因为有n种选择，那么跳n阶台阶就由n种情况之和：f(n) = f(n-1)+f(n-2)+f(n-3)……f(n-n);而f(n-1)=f(n-2)……+f(n-n)，因此f(n)=2*f(n-1);
 * @param {Number} number
 */
function jumpFloorII(number) {
  let result = 0;
  function traver (start = 1, end = number, sum = 0) {
    if (sum === number) {
      result++;
      return;
    }
    if (sum > number) { return; }
    for (let i = start; i <= end; i ++) {
      if (sum + i > number) { break; }
      traver(start, number - sum - i, sum + i);
    }
  }
  traver();
  return result;
}

function jumpFloor2 (number, one = 1, two = 2) {
  if (number <= 1) { return number; }
  if (number === 2) { return two; }
  return jumpFloorII(number - 1, two, 2 * two);
}

for (let i = 0; i < 15; i ++) {
  console.log(jumpFloorII(i));
}