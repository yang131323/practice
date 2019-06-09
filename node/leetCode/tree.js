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

// leetcode 98:验证二叉搜索树
var isValidBST2 = function(root, level = 0) {
  if ((level === 0 && !root) || (level === 0 && root.val === 0 && !root.left && !root.right)) { return true; }
  if (!root.left && !root.right) {
    let result = level === 0 ? true : root.val;
    return result;
  }
  level++;
  return (!root.left || (root.left && isValidBST(root.left, level) < root.val)) && (!root.right || (root.right && isValidBST(root.right, level) > root.val)) && ((root.right && root.right.val) || root.val);
};

let temp = null;

var isValidBST = function (root) {
  if (!root) { return true; }
  if (!isValidBST(root.left)) { return false; }
  if (temp !== null && temp >= root.val) { return false; }
  temp = root.val;
  if (!isValidBST(root.right)) { return false; }
  return true;
}

var isValidBST1 = function (root, result = []) {
  if (!root) { return true; }
  // if (!root.left && !root.right) { return true; }
  if (!isValidBST(root.left, result)) { return false; }
  if (result.length > 0 && root.val <= result[result.length - 1]) { return false; }
  result.push(root.val);
  if (!isValidBST(root.right), result) { return false; }
  return true;
}

  console.log(isValidBST({
    val: 0,
    right: null,
    left: null}));