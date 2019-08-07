/**
 * 1. 二维数组中的查找
 * 解题思路：采用广搜的思路进行一次遍历，为了节省时间，可以加一个判断，在一轮的所有数都大于target时就可以直接返回false了，因为我们是按照递增的顺序进行广搜的，所以当一轮搜索全大于
 * target值时，说明后面的值全大于target值，这时候如果还没有找到target值说明这个值根本就不存在给定的数组中。
 * @param {Number} target 
 * @param {Array} array 
 */
function Find(target, array) {
  if (array.length <=0 || target < array[0][0] || target > array[array.length - 1][array[0].length - 1]) { return false; }
  const numMap = [];
  numMap.length = array.length;
  
  for (let i = 0; i < array.length; i++) {
    numMap[i] = [];
    numMap[i].length = array[0].length;
    numMap[i].fill(0, 0);
  }
  numMap[0][0] = 1;
  let que = [[[0, 0]]], temp = [], flag = false, next = [];
  while (que.length > 0) {
    let num = 0;
    temp = que.shift();
    next = [];
    for (let i = 0; i < temp.length; i++) {
      if (array[temp[i][0]][temp[i][1]] === target) { return true; }
      if ((temp[i][0] + 1 < array.length) && numMap[temp[i][0] + 1][temp[i][1]] === 0) {
        next.push([temp[i][0] + 1, temp[i][1]]);
        numMap[temp[i][0] + 1][temp[i][1]] = 1;
      }
      if ((temp[i][1] + 1 < array.length) && numMap[temp[i][0]][temp[i][1] + 1] === 0) {
        next.push([temp[i][0], temp[i][1] + 1]);
        numMap[temp[i][0]][temp[i][1] + 1] = 1;
      }
      if (array[temp[i][0]][temp[i][1]] > target) { num++; }
    }
    if (num >= temp.length) { return false; }
    if (next.length > 0) { que.push(next); }
  }
  return false;
}

console.log(Find(4, [[1, 2, 5, 7], [2, 3, 6, 8], [5, 6, 7, 8], [7, 7, 8, 9]]));