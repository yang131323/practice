var inorderTraversal = function(root, result = []) {
  if (root === null) { return result; }
  inorderTraversal(root.left, result);
  result.push(root.val);
  inorderTraversal(root.right, result);
  return result;
};