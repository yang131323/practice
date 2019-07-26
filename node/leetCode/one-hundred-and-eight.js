/**
 * 108. 将有序数组转换为二叉搜索树
 * @param {Array} nums 
 */
var sortedArrayToBST = function(nums) {
  if (nums.length <= 0) { return null; }
  const middle = Math.floor(nums.length / 2);
  let obj = {}, result = null, temp = null;
  for (let i = 0; i <= middle; i++) {
    obj = {
      val: nums[i],
      left: result,
      right: null
    }
    result = obj;
  }
  console.log(result);
  for (let i = nums.length - 1; i > middle; i--) {
    obj = {
      val: nums[i],
      left: null,
      right: temp
    }
    temp = obj;
  }
  if (temp !== null) { result.right = temp; }
  console.log(result);
  return result;
};

console.log(sortedArrayToBST([0,1,2,3,4,5]));