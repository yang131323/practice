/**
 * 832. 翻转图像
 * 解题思路：题目很简单，先利用数组的reverse函数进行水平翻转，然后利用+！进行隐式转化先取反1变false，0变true，再true变1，false变0
 * @param {Array} A 
 */
var flipAndInvertImage = function(A) {
  const len = A.length;
  for (let i = 0; i < len; i++) {
    A[i].reverse();
    for (let j = 0; j < A[i].length; j++) {
      A[i][j] = +!A[i][j];
    }
  }
  return A;
};