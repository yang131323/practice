var postorderTraversal = function(root, result = []) {
  if (root === null) { return []; }
  postorderTraversal(root.left, result);
  postorderTraversal(root.right, result);
  result.push(root.val);
  return result;
};