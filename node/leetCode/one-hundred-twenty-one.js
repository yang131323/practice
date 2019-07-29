/**
 * 121. 买卖股票的最佳时机
 * 解题思路：暴力求解
 * @param {Array} prices 
 */
var maxProfitOne = function(prices) {
  if (prices.length <= 1) { return 0; }
  let max = 0, temp = -1, len = prices.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      temp = prices[j] - prices[i];
      max = max >= temp ? max : temp;
    }
  }
  return max;
};

/**
 * 121. 买卖股票的最佳时机
 * 解题思路：该方法是参考了官方题解，非常巧妙，依照给定的顺序依次遍历，如果遇到比min小的数，则将min赋值为该值（原理很简单：后面的元素减一个更小的值总比减一个大的值得到的结果要大），
 * 如果大于min的话，然后比较该值和min的差是否大于max，大于的话就重新赋值，这样在确定该值前面的最优解已经得到，后面我们还会以更优的形式确定该值后面的结果。
 * @param {Array} prices 
 */
var maxProfit = function (prices) {
  if (prices.length <= 1) { return 0; }
  let max = 0, min = Infinity;
  for (let i = 0; i < prices.length; i++) {
    if (min > prices[i]) {
      min = prices[i];
    } else if (prices[i] > min) {
      max = max >= prices[i] - min ? max : prices[i] - min;
    }
  }
  return max;
}