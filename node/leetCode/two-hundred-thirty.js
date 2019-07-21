/**
 * 230. 二叉搜索树中第K小的元素
 * 解题思路：对给定的二叉搜索树进行中序遍历，每便利一个元素就将k值减一，等k等于零时就是要找的值了；
 * 另外一种思路就是，先遍历一遍，将二叉搜索树的值按遍历顺序存入数组，最后返回k-1索引的数组就行
 * @param {Object} root 
 * @param {Number} k 
 */
var kthSmallest = function(root, k) {
  function find (root) {
    if (root === null) { return; }
    let result = null;
    if (root.left) {
      result = find(root.left, k);
    }
    if (k> 0) { k--; }
    if (k === 0) {
      if (result === 0) { return result; }
      return result || root.val;
    }
    if (root.right) {
      result = find(root.right, k);
    }
    if (result) { return result; }
  }
  return find(root);
};

console.log(kthSmallest({
  val: 5,
  right: {
    val: 6,
    right: null,
    left: null
  },
  left: {
      val: 3,
      right: {
        val: 4,
        right: null,
        left: null
        },
      left: {
        val: 2,
        right: null,
        left: {
          val: 1,
          right: null,
          left: null
        }
      }
    }
  }, 4));