/**
 * 26. 删除排序数组中的重复项
 * 解题思路：遍历一遍，如果和前一项相等就删除，由于nums.length是动态计算的，所以不用担心结束条件，只是在删除了一个元素之后应该将索引减一
 * @param {Array} nums 
 */
var removeDuplicates = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (i === 0) { continue; }
    if (nums[i] === nums[i - 1]) {
      nums.splice(i, 1);
      i--;
    }
  }
};