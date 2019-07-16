/*
* 922. 按奇偶排序数组 II
* 不需要排序 
*/
var sortArrayByParityII = function(A) {
  if (A.length <= 0) { return A; }
  let odd = [], even = [], len = A.length;
  for (let i = 0; i < len; i++) {
    A[i] % 2 === 0 ? even.push(A[i]) : odd.push(A[i]);
  }
  let result = [];
  for (len = 0; len < even.length; len++) {
    even[len] !== undefined ? result.push(even[len]) : '';
    odd[len] !== undefined ? result.push(odd[len]) : '';
  }
  return result;
};

/**
 * 默认以起始索引为基数进行快排
 * @param {Array} arr 需要排序数组
 * @param {Number} i 起始索引
 * @param {Number} j 结束索引
 */
function sort (arr, i, j) {
  if (i === j) { return arr; }
  let start = i, end = j;
  let x = arr[i];
  let flag = false;
  while (start <= end) {
    if (start === end) {
      arr[start] = x;
      break;
    }
    if (!flag) {
      if (arr[end] >= x) {
        end--;
        continue;
      }
      arr[start++] = arr[end];
      start > end ? start = end : '';
      flag = true;
    } else {
      if (arr[start] <= x) {
        start++;
        continue;
      }
      arr[end--] = arr[start];
      end < start ? end = start : '';
      flag = false;
    }
  }
  if (i < start) { sort(arr ,i , start); }
  if (end + 1 < j) {  sort(arr, end + 1, j); }
  return arr;
}

console.log(sort([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 10], 0, 13));