const readline = require('readline');
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function line (line) {
  const arr = line.trim().split('');
  const tree = buildTree(arr);
  let str = [];
  mediumOrder(tree, str);
  console.log(str.join(' '));
});

/**
 * 建立一颗树,一颗二叉树的每个节点都是一个独立的,同时又有相同点,分别有左孩子和右孩子,而左孩子右孩子又都是一个节点,
 * 因此左右孩子都可以看成是一次递归过程,只需要考虑怎么给左右子树赋值,而建树的过程类似于遍历的过程,只是在访问的过程中进行的操作不同而已
 * @param {Array} str 
 * @param {Object} root 
 */
function buildTree(str = [], root = {}) {
  let val;
  if (str.length === 0 || ((val = str.shift()) && val === '#')) { return null; }
  root.val = val;
  root.left = buildTree(str);
  root.right = buildTree(str);
  return root;
}

function mediumOrder(tree, str = []) {
  if (tree === null) { return ''; }
  mediumOrder(tree.left, str);
  str.push(tree.val);
  mediumOrder(tree.right, str);
}