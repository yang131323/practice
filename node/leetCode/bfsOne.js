var levelOrder = function(root) {
  let result = [];
  let arr = [];
  let queue = [[root]];
  while (queue.length) {
    let a = queue.shift();
    let temp = [];
    let val = [];
    while (a.length) {
      let b = a.shift();
      if (b) { val.push(b.val); }
      if (b.left) { temp.push(b.left); }
      if (b.right) { temp.push(b.right); } 
    }
    if (val.lenth > 0) { result.push(val); }
    if (temp.length > 0) { queue.push(temp); }
  }
  console.log(result);
};


// 递归 - 二叉树的锯齿形层次遍历
var zigzagLevelOrder = function(root, result = [], layer = 0) {
  if (!root) { return []; }
  if (root.val || root.val === 0) {
    result[layer] = Array.isArray(result[layer]) ? result[layer] : [];
    layer % 2 === 0 ? result[layer].push(root.val) : result[layer].unshift(root.val);
  }
  if (root.left) { zigzagLevelOrder(root.left, result, layer + 1); }
  if (root.right) { zigzagLevelOrder(root.right, result, layer + 1); }
  return result;
};

// 队列
var zigzagLevelOrder = function(root) {
  if (!root) { return []; }
  let result = [];
  let queue = [[root]];
  let isOrder = true;
  while (queue.length) {
    let a = queue.shift();
    let val = [];
    let temp = [];
    while (a.length) {
      let b = a.shift();
      if (b && (b.val || b.val === 0)) {
        if (isOrder) { val.push(b.val); }
        else { val.unshift(b.val); }
      }
      if (b.left) { temp.push(b.left); }
      if (b.right) { temp.push(b.right); }
    }
    if(val.length > 0) { result.push(val); }
    if (temp.length > 0) { queue.push(temp); }
    isOrder = !isOrder;
  }
  return result;
};