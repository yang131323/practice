let arr = [3, 5, 6, 8, 1, 2, 4, 7];
function wrap (arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function quickSort (arr, start, end) {
  if (arr.length < 2 || start >= end) { return arr; }
  let flag = start + 1;
  for (let i = flag; i <= end; i++) {
    if (arr[start] > arr[i]) {
      wrap(arr, flag, i);
      flag++;
    }
  }
  wrap(arr, start, flag - 1);
  if (flag - 1 > start) { quickSort(arr, start, flag - 1); }
  if (flag < end) { quickSort(arr, flag, end); }
  return arr;
}

console.log(quickSort(arr, 0, 7));