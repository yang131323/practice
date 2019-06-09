// 5. 最长回文子串
var longestPalindrome1 = function(s) {
  if (!s) { return s; }
  const judgeBackText = function (text) {
      return text === text.split('').reverse().join('');
  }
  let len = s.length;
  let result = '';
  for (let i = 0 ; i < len;i ++) {
      for (let j = i; j < len; j++) {
          let temp = s.substring(i, j + 1);
          result = judgeBackText(temp) ? ((result.length < (j - i + 1)) ? temp : result) : result;
      }
  }
  return result;
};

function getArrayP(str){  
  var p = [],   
      mx = 0,  
      id = 0;  
  var i;  
   
  var newStr = str;       // 将字符串转化为奇数长度获取到新的字符串 
  newStr = newStr.replace(/(\w)/g, '$1,#');
  newStr = '#' + newStr;
  const newLen = newStr.length;
  p.length = newLen;
  p.fill(0, 0);
  // 获取到所有的子回文的长度值组成的数组  
  for (i = 0; i < newLen; i++) {
      p[i] = mx > i ? Math.min(p[2*id-i], mx-i) : 1;
      // 超出其半径的位置再做额外判断，确保 newStr[i + p[i]] 是存在的  
      while ((newStr[i - p[i]] && newStr[i + p[i]] && newStr[i + p[i]] == newStr[i - p[i]])){
        p[i]++;
      }
      // 当有更大的回文串出现时，更新中心位置和最大边界值
      if (i + p[i] > mx) {  
          id = i;  
          mx = id + p[i];  
      }  
  }  
  return p;
} 

var longestPalindrome = function(s) {
  if (!s) { return s; }
  let result = '';
  let id = 0;
  let maxR = 0;
  let pl = [];
  let cS = s;
  cS = '#';
    for (let i = 0, len = s.length; i < len; i++) {
        cS += s[i] + '#';
    } 
  let len = cS.length;
  pl.length = len;
  pl.fill(0, 0);
  for (let i = 0; i < len; i ++) {
      /** 有两种情况：
       * 1. 当半径小于pl[2 * id - i]时超出了id回文串范围，应该只取半径范围
       * 2. 在半径之内那就是等于pl[2 * id - i]，因此不管哪种情况都取两者最小值 
      */ 
      pl[i] = i >= maxR ? 1 : Math.min(maxR - i, pl[2 * id - i]);
      while(cS[i + pl[i]] && cS[i - pl[i]] && cS[i + pl[i]] === cS[i - pl[i]]) {
        pl[i]++;
      }
      if (i + pl[i] > maxR) {
          id = i;
          maxR = i + pl[i];
      }
      result = result.length >= (2 * pl[i] - 1) ? result : cS.substring(i - pl[i] + 1, i + pl[i]);
  }
  return (result.replace(/#/g, ''));
};

console.log(longestPalindrome("babad"));