// leetCode 131场周赛
// 题目链接：https://leetcode-cn.com/contest/weekly-contest-131

// 删除最外层的括号 - 利用stack结构
var removeOuterParentheses = function(S) {
  let result = [];
  let str = '';
  let temp = [];
  let flag = 0;
  for (let i = 0; i < S.length; i++) {
      if (S[i] === '(') {
          temp.push(S[i])
      } else {
          temp.pop();
      }
      if(temp.length === 0) {
          result.push(S.substring(flag, i + 1));
          flag = i + 1;
      }
  }
  for (let j = 0 ; j < result.length; j++) {
      str += result[j].substring(1, result[j].length - 1);
  }
  return str;
};

// 驼峰式匹配 - 暴力求解
var camelMatch = function(queries, pattern) {
  let result = [];
  for (let i = 0 ; i < queries.length; i++) {
      let temp = pattern;
      let j = 0;
      for (; j < queries[i].length; j++) {
          if (temp.length === 0 && !(/[A-Z]/g.test(queries[i].substr(j)))) {
            result.push(true);
            break;
          }
          if(/[A-Z]/.test(queries[i][j]) && queries[i][j] !== temp[0]) {
              result.push(false);
              break;
          } else if (queries[i][j] === temp[0]) {
              temp = temp.substr(1);
          }
      }
      if (j >= queries[i].length && temp.length > 0) { result.push(false); }
      else if (j >= queries[i].length && temp.length <= 0 ) { result.push(true); }
  }
    return result;
};

console.log(camelMatch(["IXfGawluvnCa","IsXfGaxwulCa","IXfGawlqtCva","IXjfGawlmeCa","IXfGnaynwlCa","IXfGcamwelCa"], "IXfGawlCa"));