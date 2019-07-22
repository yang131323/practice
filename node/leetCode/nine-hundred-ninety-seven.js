/**
 * 997. 找到小镇的法官
 * 解题思路：每个人维持一个信任队列，然后找到第一个信任队列为空的人，判断所有人的信任队列中是否有这个人，如果有则他是法官，否则没有
 * @param {Number} N 
 * @param {Array} trust 
 */
var findJudge = function(N, trust) {
  if (N === 0) { return -1; }
  if (N === 1) { return 1; }
  const parent = [];
  for (let i = 0; i < N; i++) {
    parent[i] = new Set();
  }
  for (let i = 0; i < trust.length; i++) {
    parent[trust[i][0] - 1].add(trust[i][1] - 1);
  }
  let result = -1;
  for (let i = 0; i < N; i++) {
    if (parent[i].size === 0) {
      result = i;
      break;
    }
  }
  for (let i = 0; i < N; i++) {
    if (i !== result && !parent[i].has(result)) { return -1; }
  }
  return result + 1;
};

console.log(findJudge(2, [[1,2]]));