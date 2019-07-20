/**
 * 200. 岛屿数量
 * @param {Array} grid 
 */
var numIslands = function(grid) {
  const parent = [], row = grid.length, col = grid[0].length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const id = i * col + j;
      parent[id] = grid[i][j] === '1' ? id : -1;
    }
  }
  function find (x) {
    while (x !== parent[x]) {
      x = parent[x];
    }
    return x;
  }
  function merge (x, y) {
    const par = find(x);
    const son = find(y);
    parent[son] = par;
  }
  function pathZip () {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (grid[i][j] !== '1') { continue; }
        const start = i * col + j;
        if (i > 0 && grid[i - 1][j] === '1') { merge(start - col, start); }
        if (j > 0 && grid[i][j - 1] === '1') { merge(start - 1, start); }
      }
    }
  }
  pathZip();
  let sum = 0;
  for (let i = 0; i < row * col; i++) {
    if (parent[i] === i) { sum++; }
  }
  return sum;
};

console.log(numIslands([["1","0","1"],["0","1","0"],["1","0","1"]]));