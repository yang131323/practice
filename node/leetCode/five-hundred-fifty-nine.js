/**
 * 559. N叉树的最大深度
 * 解题思路：就是一个深度遍历，可以使用递归进行深度遍历，也可以使用栈进行深度遍历。
 * @param {Object} root 
 */
var maxDepth = function(root) {
  if (root === null) { return 0; }
  const stack = [[1, []]];
  let deepth = 1, childs = root.children, result = 0;;
  while (stack.length > 0) {
    if (childs && childs.length > 0) {
      stack.push([++deepth, childs.slice(1)]);
      childs = childs[0].children || [];
      result = result < deepth ? deepth : result;
      continue;
    } else {
      childs = [];
      const [level, brothers] = stack.pop();
      deepth = level;
      result = result < deepth ? deepth : result;
      if (!brothers || brothers.length <= 0) { continue; }
      const temp = brothers.pop()
      stack.push([deepth, brothers]);
      childs = temp.children || [];
    }
  }
  return result;
};