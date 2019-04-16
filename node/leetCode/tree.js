// 判断是否两棵树是否相同
var isSameTree = function(p, q) {
  if (!p && !q) { return true; }
  if (!p || !q) {return false; }
  if (p.val !== q.val) { return false; }
  let result;
  if (p.left && q.left) { result = isSameTree(p.left, q.left); }
  else if ((p.left && !q.left) || (!p.left && q.left)) { return false; }
  if (result === false) { return result; }
  else if ((p.right && !q.right) || (!p.right && q.right)) { return false; }
  if (p.right && p.right) { result = isSameTree(p.right, q.right); }
  return result;
};

// console.log(isSameTree({
//   val: 1,
//   right:  { val: 3, right: null, left: null },
//   left:  { val: 2, right: null, left: null } }, {
//   val: 1,
//   right:  { val: 3, right: null, left: null },
//   left:  { val: 2, right: null, left: null } }))

// 验证二叉搜索树
var isValidBST = function(root, layer = 0) {
  if (!root) { return true; }
  let tempL = isValidBST(root.left, layer + 1);
  let reL = tempL;
  if (layer !== 0 && typeof tempL === 'boolean') { return tempL ? root.val : tempL; }
  else if (typeof tempL === 'number') {
    reL = tempL >= root.val ? false : (layer === 0 ? tempL : root.val);
    if (layer !== 0) { return reL };
  }
  let tempR = isValidBST(root.right, layer + 1);
  let reR = tempR;
  if (layer !== 0 && typeof tempR === 'boolean') { return tempR ? root.val : tempR; }
  else if (typeof tempR === 'number') {
    reR = tempR > root.val ? (layer === 0 ? tempR : root.val): false;
    if (layer !== 0) { return reR };
  }
  if (layer === 0) { return Boolean(reL) && Boolean(reR); }
};

  console.log(isValidBST( {
    val: 10,
    right:
      {
       val: 15,
       right:  { val: 20, right: null, left: null },
       left:  { val: 6, right: null, left: null } },
    left:  { val: 5, right: null, left: null } }));