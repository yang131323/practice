let arr = [3, 5, 6, 8, 1, 2, 4, 7];
function merge (left, right) {
  const result = [];
  while (left.length > 0 && right.length > 0) {
  	if (left[0] <= right[0] ) {
      result.push(left[0]);
      left.shift();
    } else {
      result.push(right[0]);
      right.shift();
    }
  }
  if (left.length > 0) {
  	for (let x of left) {
      result.push(x);
    }
  } else if (right.length > 0) {
    for (let x of right) {
      result.push(x);
    }
  }
  return result;
}

function sort (arr) {
  if (arr.length < 2) { return arr; }
  const middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(sort(left), sort(right));
}

console.log(sort(arr));