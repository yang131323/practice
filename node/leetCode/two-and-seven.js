/**
 * 207. 课程表
 * 解题思路：如果要想能选修完，其实只要不存在环就行，根据给出的课程关系，我们构建相关的课程关系图，然后遍历真个图，如果在遍历的过程中出现环那么就不能选修完毕，否则就能。
 * @param {Number} numCourses 
 * @param {Array} prerequisites 
 */
var canFinish = function(numCourses, prerequisites) {
  if (prerequisites.length <= 0) { return true; }
  const parent = [];
  let par = null, stack = [];
  for (let i = 0; i < numCourses; i++) {
    parent.push([]);
  }
  for (let i = 0; i < prerequisites.length; i++) {
    const temp = prerequisites[i][1];
    let pass = new Set();
    stack.push(...parent[temp]);
    par = temp;
    parent[prerequisites[i][0]].push(temp);
    while (stack.length > 0) {
      if (par === prerequisites[i][0]) { return false; }
      par = stack.shift();
      if (pass.has(par)) { continue; }
      pass.add(par);
      stack.push(...parent[par]);
    }
    if (par === prerequisites[i][0]) { return false; }
  }
  return true;
};

console.log(canFinish(3, [[1,0],[0,2],[2,1]]));