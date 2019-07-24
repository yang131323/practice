/**
 * 15. 三数之和
 * @param {Array} nums 
 */
var threeSum = function(nums) {
  if (nums.length <= 2 ) { return []; }
  nums.sort((a,b) => a-b)
  if (nums[0] > 0 || nums[nums.length - 1] < 0) { return []; }
  let result= [];
  let start;
  let end;
  let temp = 0;
  for (let i = 0, len = nums.length; i < len - 2; i++) {
      start = i + 1;
      end = len - 1;
      if (nums[i] === nums[i - 1]) { continue; }
      while (start < end) {
          temp = nums[i] + nums[start] + nums[end];
          if (temp === 0) {
              result.push([nums[i], nums[start], nums[end]]);
              end--;
              start++;
          } else if (temp < 0) {
              start++;
              continue;
          } else if (temp > 0) {
              end--;
              continue
          }
          while (nums[start] === nums[start - 1]) { start++; }
          while (nums[end] === nums[end + 1]) { end--; }
      }
  }
  return result;  
}

console.log(threeSum([-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]))