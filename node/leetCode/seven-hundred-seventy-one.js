/**
 * 771. 宝石与石头
 * 解题思路：将所有类型的宝石记录一遍，然后遍历你拥有的宝石是否在宝石里面，如果是计数加一
 * @param {String} J 
 * @param {String} S 
 */
var numJewelsInStones = function(J, S) {
  const map = new Map();
  let sum = 0;
  for (let i = 0; i < J.length; i++) {
    map.set(J[i], true);
  }
  for (let i = 0; i < S.length; i++) {
    if (map.get(S[i])) { sum++; }
  }
  return sum;
};