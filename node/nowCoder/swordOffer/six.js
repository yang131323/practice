/**
 * 6. 旋转数组的最小数字
 * 解题思路：由于以前是一个升序的数组，进行旋转之后就是一个分为两段的数组，每一段都是递增的，因此只要找到两段的交界点就是结果，但是有一种特殊情况，就是可能整个数组都是同一个数
 * 因此最后还需要考虑一下这种特殊情况，如果遍历完一遍没有找一个值小于前面那个值得，就随便返回一个数组中的一个数，因为整个数组都是相同的。
 * @param {Array} rotateArray 
 */
function minNumberInRotateArray(rotateArray) {
  if (rotateArray.length <= 0 || rotateArray.length === 1) { return rotateArray.length <= 0 ? 0 : rotateArray[0]; }
  const len = rotateArray.length;
  for (let i = 1; i < len; i++) {
    if (rotateArray[i] < rotateArray[i - 1]) {
      return rotateArray[i];
    }
  }
  return rotateArray[0];
}