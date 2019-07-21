/**
 * 852. 山脉数组的峰顶索引
 * 解题思路：根据题目给定的山脉数组含义，可以很快知道只要遍历数组，遇到第一个大于后面的元素就是我们要找的山脉数组峰顶索引
 * @param {Array} A 
 */
var peakIndexInMountainArray = function(A) {
  for (let i = 0; i < A.length; i++) {
      if (i!== 0 && A[i - 1] > A[i]) { return i - 1; }
  }  
};