/**
 * 16. 最接近的三数之和
 * @param {Array} nums 
 * @param {Number} target 
 */
var threeSumClosest = function(nums, target) {
  if (nums.length <= 2) { return 0; }
  nums.sort((a, b) => a - b);
  let result = 0;
  let temp = 0;
  let left, right;
  let com = Infinity;
  for (let i = 0, len = nums.length; i <= len - 2; i++) {
      left = i + 1;
      right = len - 1;
      if (nums[i] === nums[i - 1]) { continue; }
      while (left >= right) {
        while (left !== i + 1 && nums[left] === nums[left - 1]) { left++; }
        while (right !== len - 1 && nums[right] === nums[right + 1]) { right--; }
        if (left < right) { break; }
          temp = target - nums[i] - nums[left] - nums[right];
          com > Math.abs(temp) ? (result = target - temp) && (com = Math.abs(temp)) : ''; 
          if (temp === 0) {
              result = target;
              temp = false;
              break;
          }
          if (temp > 0) {
              left++;
          }
          if (temp < 0) {
              right--;
              console.log(right);
          }
      }
      if (temp === false) { break; }
  }
  return result;
};

console.log(threeSumClosest([1,1,1,0], -100));