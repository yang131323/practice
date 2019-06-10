/**
 * 11. 盛最多水的容器
 * @param {Array} height 
 */
var maxArea = function(height) {
  let start = 0;
  let end = height.length - 1;
  let max = 0;
  for (;start < end;) {
      let temp = (end - start) * Math.min(height[start], height[end]);
      max = max >= temp ? max : temp;
      if (height[start] > height[end]) { end--; }
      else { start++; }
  }
  return max;
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]))