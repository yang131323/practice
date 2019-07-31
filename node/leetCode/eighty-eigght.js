/**
 * 88. 合并两个有序数组
 * 解题思路：千万不要被预期结果骗了，我写完这个题就花了十分钟左右，但是当我测试边缘情况的时候发现和预期结果不同，以为它是根据m + n的长度来动态决定要不要截断nums1，后面发现它的这个
 * 预期结果非常怪，所以我只对m+n前几位，相同我就认为我的是正确的，然后一提交还真过了，是真的坑！花了我大半个小时在调，最后第一遍写的直接过了。其实就是动态插入nums2的元素到nums1中
 * 如果nums1当前元素大于nums2当前元素，则将nums2当前元素插入到nums1当前元素中
 * @param {Array} nums1 
 * @param {Number} m 
 * @param {Array} nums2 
 * @param {Number} n 
 */
var merge = function(nums1, m, nums2, n) {
  nums1.length = m;
  nums2.length = n;
  let j = 0;
  for (let i = 0; i < nums2.length;) {
    if (j >= nums1.length) {
      nums1.splice(j, 0, ...nums2.slice(i));
      break;
    }
    if (nums1[j] > nums2[i]) {
      nums1.splice(j, 0, nums2[i]);
      i++;
    }
    j++;
  }
  return nums1;
};