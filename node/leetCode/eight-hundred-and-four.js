/**
 * 804. 唯一摩尔斯密码词
 * 解题思路：这个题比较简单，就是一个拼接字符串然后去重的一个过程，有个小技巧就是可以将字符转换为ascii码这样就不用写一个映射对象了，直接对a的ascii值取余就可以拿到相应的摩尔斯密码
 * @param {Araay} words 
 */
var uniqueMorseRepresentations = function(words) {
  const secretMap = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
  const set = new Set();
  let str = '';
  for (let i = 0; i < words.length; i++) {
    str = '';
    for (let j = 0; j < words[i].length; j++) {
      str += secretMap[words[i][j].charCodeAt() % 97];
    }
    set.add(str);
  }
  return set.size;
};
console.log(['', '', ''])