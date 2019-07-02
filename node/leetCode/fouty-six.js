/**
 * 46. 全排列：解题思路
 * 可以把它看成是一个层次遍历，每一层都是在上层选择的基础上进行选择
 * 可以选择标记，每一个选择的每一层选择了哪一个，进行全遍历，或者将选择
 * 的值放到数组当前层的索引位置，这样开始都从每一层的层数开始遍历
 * @param {Array} nums 
 */
var permute = function(nums) {
  let convert = function (arr, i, j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }
  let traves = function (result, arr, start) {
      if (start === nums.length) {
          result.push([...arr]);
          return;
      }
      for (let i = start; i < nums.length; i++) {
          convert(nums, i, start);
          traves(result, arr, start + 1);
          convert(nums, i, start);
      }
  }
  let result = [];
  traves(result, nums, 0);
  traves = convert = nums = null;
  return result;
};

console.log(permute([1, 2, 3, 4]));