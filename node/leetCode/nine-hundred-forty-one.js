/**
 * 941. 有效的山脉数组
 * 题意：就是山字的数字表示，中间有一座最高峰，两边递减。
 * 解题思路：从0开始一旦遇到一个前值大于后值的，那就开始判断后面一部分。
 * @param {Array} A 
 */
var validMountainArrayOne = function(A) {
  if (A.length < 3) { return false; }
  function sort(arr, start, end) {
    if (start === end) { return arr; }
    let flag = false, i = start, j = end, temp = arr[start];
    while (i <= j) {
      if (i === j) {
        arr[i] = temp;
        break;
      }
      if (!flag) {
        if (arr[j] >= temp) {
          j--;
          continue;
        }
        arr[i++] = arr[j];
        flag = true;
      } else {
        if (arr[i] <= temp) {
          i++;
          continue;
        }
        arr[j--] = arr[i];
        flag = false;
      }
    }
    if (start < i) { sort(arr, start, i); }
    if (i + 1 < end) { sort(arr, i + 1, end); }
    return arr;
  }

  let max = -1, index = -1;
  for (let i = 0; i < A.length; i++) {
    if (max < A[i]) {
      max = A[i];
      index = i;
    }
  }
  if (index === A.length - 1 || index === 0) { return false; }
  let arrOne = sort(A.slice(0, index), 0, index - 1);
  let arrTwo = sort(A.slice(index), 0, A.length - index - 1);
  console.log(arrOne, arrTwo, A.slice(0, index), A.slice(index));
  return [...new Set(arrOne)].join('') === A.slice(0, index).join('') && [...new Set(arrTwo.reverse())].join('') === A.slice(index).join('') && A[0] !== A[index] && A[index] !== A[A.length - 1];
};

console.log(validMountainArray([0,3,2, 1]));

var validMountainArray = function (A) {
  if (A.length < 3) { return false; }
  let flag = -1, max = -1;
  for (let i = 0; i < A.length; i++) {
    if (i !== A.length - 1 && A[i] === A[i + 1]) { return false; }
    if (i !== 0 && A[i - 1] > A[i]) {
      max = A[i - 1];
      flag = i - 1;
      break;
    }
  }
  if (A[0] > max || flag === 0) { return false; }
  let j = flag + 1;
  for (; j < A.length; j++) {
    if (j !== A.length - 1 && A[j] === A[j + 1]) { return false; }
    if (j !== 0 && A[j - 1] < A[j]) {
      break;
    }
  }
  if (j >= A.length) { return true; }
  return false;
}