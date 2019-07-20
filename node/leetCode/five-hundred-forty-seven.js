/**
 * 547. 朋友圈
 * 解题思路：每层为1的格子，责令让相应的j的父节点为该层的的父节点（前提条件是该节点的父节点还是自己， 不是自己节点需要更新所有父节点为该层的节点）
 * @param {Array} M 
 */
var findCircleNum = function(M) {
  const parent = [], len = M.length;
  for (let i = 0; i < len; i++) {
    parent[i] = i;
  }
  function find (x) {
    while (x !== parent[x]) {
      x = parent[x];
    }
    return x;
  }
  function pathZip () {
    for (let i = 0; i < len - 1; i++) {
      for (let j = i + 1; j < len; j++) {
        if (M[i][j] === 1 && parent[j] === j) {
          parent[j] = find(i);
        } else if (M[i][j] === 1 && parent[j] !== j) {
          const par = find(j), temp = parent[i];
          parent[i] = par;
          for (let x = 0; x < len; x++) {
            parent[x] === temp ? (parent[x] = par) : '';
          }
        }
      }
    }
  }
  pathZip();
  let sum = 0;
  for (let i = 0; i < parent.length; i++) {
    if (parent[i] === i) { sum++; }
  }
  return sum;
};

console.log(findCircleNum([[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]]));