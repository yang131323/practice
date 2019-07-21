/**
 * 704. 二分查找
 * 解题思路：由于这个题是被划分在二分法这一类，因此最好使用二分法进行解决，如果直接使用数组自带的查找函数则会使这个题目太过于简单，就一行代码就解决了
 * 二分法查找思想很简单：首先找到这个序列的中间序号，和这个序号进行对比，如果小于或者等于中间值，则在前半部分进行查找，如果大于中间值则在后半部分查找。
 * @param {Array} nums 
 * @param {Number} target 
 */
var search = function(nums, target) {
  if (target < nums[0] || target > nums[nums.length - 1]) { return -1; }
  if (target === nums[0]) { return 0; }
  if (target === nums[nums.length - 1]) { return nums.length - 1; }
  function find (start, end) {
    if (start === end && nums[start] === target) { return start; }
    if (start === end && nums[start] !== target) { return -1; }
    const middle = Math.floor((start + end) / 2);
    if (target <= nums[middle]) {
      return find(start, middle);
    } else {
      return find(middle + 1, end);
    }
  }
  return find(0, nums.length - 1);
};

console.log(search([-1,0,3,5,9,12], 9));