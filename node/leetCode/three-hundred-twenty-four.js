/**
 * 324. 摆动排序 II
 * 解题思路：先进行排序，然后拿到中间节点，将原数组分为两部分，然后将两部分以倒序的方式交叉混合，以前部分作为起点。
 * @param {Array} nums 
 */
var wiggleSort = function(nums) {
  if (nums.length <= 1) { return nums; }
  let len = nums.length;
  function sort (arr, start, end) {
    if (start === end) { return; }
    let i = start, j = end, temp = arr[start], flag = false;
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
  }
  sort(nums, 0, len - 1);
  let middle = len % 2 === 0 ? Math.floor(len / 2) : Math.ceil(len / 2);
  let arr1 = nums.slice(0, middle), arr2 = nums.slice(middle), le = arr2.length;
  nums.length = 0;
  for (let i = 0; i < middle; i++) {
    nums.push(arr1[middle - i - 1]);
    if (i < le) {
      nums.push(arr2[le - i - 1]);
    }
  }
};

console.log(wiggleSort([1,5,1,1,6,4]));