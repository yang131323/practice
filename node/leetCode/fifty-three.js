/**
 * 53. 最大子序和
 * 解题思路：遍历一遍nums，使用一个值max记录目前最大值，使用一个值cur记录当前值之和，在遍历下一个元素的时候，如果cur大于零那么就更新当前值cur = cur + max[i]
 * 否则更新当前的值为cur = max[i]
 * @param {Array} nums 
 */
var maxSubArray = function(nums) {
  if (nums.length <= 0) { return 0; }
  let cur = nums[0], max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (cur + nums[i] > nums[i]) {
      cur += nums[i];
      max = Math.max(max, cur);
    } else {
      max = Math.max(max, cur, nums[i]);
      cur = nums[i];
    }
  }
  return max;
};