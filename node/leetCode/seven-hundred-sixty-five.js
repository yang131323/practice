/**
 * 765. 情侣牵手
 * 解题思路：记录每一对情侣原先的位置，然后判断一对位置是否为情侣，如果不是将第二个位置与第一个位置对应情侣的位置进行替换，同时更新映射表
 * @param {Array} row 
 */
var minSwapsCouples = function(row) {
  const map = new Map(), len = row.length;
  let sum = 0;
  function swap (x, y) {
    sum++;
    const temp = row[x];
    row[x] = row[y];
    row[y] = temp;
    map.set(row[x], x);
    map.set(row[y], y);
  }
  for (let i = 0; i < len; i++) {
    map.set(row[i], i);
  }
  for (let i = 0; i < len; i += 2) {
    if (row[i] % 2 === 0 && row[i + 1] !== row[i] + 1) {
      swap(i + 1, map.get(row[i] + 1));
    } else if (row[i] % 2 !== 0 && row[i + 1] !== row[i] - 1) {
      swap(i + 1, map.get(row[i] - 1));
    }
  }
  return sum;
};

console.log(minSwapsCouples([0,2,4,6,7,1,3,5]));