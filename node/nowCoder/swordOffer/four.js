/**
 * 4. 重建二叉树
 * 解题思路：以先序遍历为基，每一个节点都是一个二叉树，都有左右两颗子树，遍历先序然后在中序中找到同一元素的索引，然后递归遍历左右子树，直至pre遍历结束。
 * @param {Object} pre 
 * @param {Object} vin 
 */
function reConstructBinaryTree(pre, vin, flag = [0], start  = 0, end = pre.length - 1) {
  if (end < start) { return null; }
  const index = vin.indexOf(pre[flag[0]]), cur = {
    val: pre[flag[0]],
    left: null,
    right: null
  };
  if (~index && index - start > 0) {
    flag[0]++;
    cur.left = reConstructBinaryTree(pre, vin, flag, start, index - 1);
  }
  if (~index && end - index > 0) {
    flag[0]++;
    cur.right = reConstructBinaryTree(pre, vin, flag, index + 1, end);
  }
  return cur;
}

console.log(JSON.stringify(reConstructBinaryTree(["A", "B", "D", "G", "C", "E", "F", "H"], ["D", "G", "B", "A", "E", "C", "H", "F"])));
