/**
 * 22. 括号生成
 * 解题思路：我看到别人使用动态规划做的，实在没有看懂，所以放弃了，还是使用比较简单、容易理解的吧！
 * 我这里把它看成一个排列组合问题了，一个是2n个字符，那么每个位置都可以有'('和')'两种可能，但是有一些不符合规则，于是我们可以使用判断条件来过滤，如果已有左括号数小于等于右括号数
 * 那么下一个应该添加的字符将不能添加右括号，其他情况下都有两种选择，然后再考虑一下边缘情况就行了。
 * @param {Number} n 
 */
var generateParenthesis = function(n) {
  const result = [];
  function traver (str, l = 0, r = 0) {
    if (l === n && r === n) {
      result.push(str);
      return;
    }
    if (l < n) { traver(str + '(', l + 1, r); }
    if (l > r) { traver(str + ')', l, r + 1); }
  }
  traver('');
  return result;
};