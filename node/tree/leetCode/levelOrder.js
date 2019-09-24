var levelOrderBottom = function(root, result = [], level = 0) {
  if (root === null) { return result; }
  if (!Array.isArray(result[level])) { result[level] = []; }
  result[level].push(root.val);
  levelOrderBottom(root.left, result, level + 1);
  levelOrderBottom(root.right, result, level + 1);
  if (level === 0) { return result.reverse(); }
};