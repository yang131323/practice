/**
 * 429. N叉树的层序遍历
 * 解题思路：这个leetcode是将它归于广搜类型的，但是我这里没有使用广搜，而是采用了递归的方式，根据level判断现在是哪一层，然后判断它是否有被初始化，如果有的话，代表该层已经有值加入进去
 * 周需要将值push进当前层（level - 1）的数组就行.如果使用广搜的话，可以简历一个队列，这个队列以每一层的所有节点为一个元素，因此队列没遍历一个元素就是遍历一层，举个例子（官方例子）：
 * 第一层是root对象，为了构造统一性可以给它封装成一个只包含一个元素的数组，然后遍历第一层，将二层所有字节点都封装成一个数组然后放入队列，这是第一层以遍历完，并以从队列弹出，第二层
 * 进入队列，然后弹出、遍历，直到队列为空。
 * @param {Object} root 
 */
var levelOrder = function(root, parent = [], level = 1) {
  if (root === null) { return []; }
  if (!parent[level - 1]) { parent[level - 1] = []; }
  if (Object.prototype.toString.call(root) === '[object Object]') {
    parent[level - 1].push(root.val);
    if (!root.children || root.children.length <= 0) { return parent; }
    levelOrder(root.children, parent, level + 1);
  }
  for(let i = 0; i < root.length; i++) {
    parent[level - 1].push(root[i].val);
    if (root[i].children && root[i].children.length > 0) { levelOrder(root[i].children, parent, level + 1); }
  }
  return parent;
};

console.log(levelOrder({ val: 1,
  children:
   [ { val: 3, children: [{
     val: 5,
     children: []
   }, {
     val: 6,
     children: []
   }] },
     { val: 2, children: [] },
     { val: 4, children: [] } ] }))