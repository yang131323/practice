/**
 * 
 * @param {Number} number 
 */
function jumpFloor(number) {
  if (number <= 2) { return number; }
  let sum = 0, stack = [2], path = 2;
  while (stack.length > 0) {
    if (path > number) {
      path -= stack.pop();
      continue;
    }
    if (path === number) {
      sum++;
      let temp = stack.pop();
      stack.push(temp === 1 ? 2 : 1);
      temp === 1 ? path -= 1 : path += 1;
      continue;
    }
    if (path < number && path + 2 < number) {
      path += 2;
      stack.push(2);
      continue;
    }
    path += 1;
    stack.push(1);
  }
  return sum;
}

console.log(jumpFloor(19));