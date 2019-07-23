/**
 * 938. 二叉搜索树的范围和
 * 解题思路：按照二叉搜索树的定义进行遍历，当值大于等于L时开始计算和，当值大于R时结束遍历。
 * @param {Object} root 
 * @param {Number} L 
 * @param {Number} R 
 */
var rangeSumBST = function(root, L, R) {
  let result = 0;
  function traver (root) {
    if (root === null) { return; }
    if (root.left) { traver(root.left); }
    if (root.val >= L && root.val <= R) { result += root.val; }
    if (root.val === R) { return; }
    if (root.right) { traver(root.right); }
  }
  traver(root);
  return result;
};