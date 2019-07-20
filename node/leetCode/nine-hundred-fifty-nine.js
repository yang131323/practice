/**
 * 959. 由斜杠划分区域
 * 并查集思想：主要分为三部——初始化、路径压缩（合并）、计算子集
 * 1. 初始化每个数据的父索引（一般就是本身索引，不排除变种）
 * 2. 根据题意确定需要合并的数据项（合并的数据项需要查找各自的根父节点，然后将两个子路径合并成一个共用根父节点的一个子路径）
 * 3. 遍历存储各个数据的数组，计算一共有多少哥子集，然后根据题意得出结果。
 * 解题思路：由于\和/会作用在一个格子中会将一个格子分为四部分，既然这样的话，再将一个格子划分成一个2*2的格子（以两个对角线为分割线）
 * 为了便于寻找相应的位置，将规定所有的格子都按上下左右的方向进行编号（也就是0、1、2、3的顺序，注意这并不代表里面是一个2*2的二维数组，
 * 因为我们将会使用一个一维数组记录每个数据的父索引，因此这里的0、1、2、3代表的是属于这个格子的区域大小顺序，比如现在是第2行第2个格子——4*4，
 * 则这个格子上下左右部分对应的索引为：20、21、22、23，数组索引从零开始，该格子第一个索引为：4*4+1*4），接下来就是压缩路径，寻找可以合并的
 * 子路径，如果是\则可以合并2和3、0和1，如果是/则可以合并0和3、2和1，最后每个格子还需要考虑和上一个格子的2合并以及和左边格子1合并。
 * @param {parentay} grid
 */
var regionsBySlashes = function(grid) {
  if (grid.length <= 0) { return 0; }
  const parent = [], len = grid.length, num = 4 * len * len;
  for (let i = 0; i < num; i++) {
    parent[i] = i;
  }
  function find (x) {
    while (x !== parent[x]) {
      x = parent[x];
    }
    return x;
  }
  function merge (x, y) {
    const par = find(x);
    const child = find(y);
    parent[child] = par;
  }
  function pathZip () {
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        const start = (i * len + j) * 4;
        switch(grid[i][j]) {
          case '/':
            merge(start, start + 3);
            merge(start + 1, start + 2);
            break;
          case '\\':
            merge(start, start + 1);
            merge(start + 3, start + 2);
            break;
          default:
            merge(start, start + 1);
            merge(start + 1, start + 2);
            merge(start + 2, start + 3);
            break;
        }
        if (i > 0) { merge(start - (4 * len) + 2, start); }
        if (j > 0) { merge(start - 3, start + 3); }
      }
    }
  }
  pathZip();
  let sum = 0;
  for (let i = 0; i < num; i++) {
    if (parent[i] === i) { sum++; }
  }
  return sum;
};

console.log(regionsBySlashes(["/\\","\\/"]));