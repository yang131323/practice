var largestPerimeterOne = function(A) {
  function isTriangle ([a, b, c]) {
    return (a + b) > c && (b + c) > a && (a + c) > b
  }
  function sort (arr, start, end) {
    let i = start, j = end, temp = arr[start];
    while (i < j) {
      while (i < j && arr[j] >= temp) { j--; }
      arr[i] = arr[j];
      while (i < j && arr[i] <= temp) { i++; }
      arr[j] = arr[i];
    }
    arr[i] = temp;
    if (start < i) { sort(arr, start, i); }
    if (i + 1 < end) { sort(arr, i + 1, end); }
  }

  let result = [], max = 0;
  function group (arr, start = 0, level = 1) {
    if (level > 3) { return; }
    for (let i = start; i < A.length; i++) {
      if (level === 3 && arr.length === 2) { result.push(arr.concat(A[i])); }
      group(arr.concat(A[i]), i + 1, level + 1);
    }
  }
  sort(A, 0, A.length - 1);
  group([]);
  for (let i = 0; i < result.length; i++) {
    let temp = result[i][0] + result[i][1] + result[i][2];
    if (isTriangle(result[i])) { max = max > temp ? max : temp; }
  }
  return max;
};

/**
 * 976. 三角形的最大周长
 * 解题思路：这个题比较有意思，原本我按照自己的想法是遍历所有可能（求出所有可能，就是一个组合，n个元素里面任选三个，然后求最大值），但是在一位朋友的指导下，换成了贪心算法，贪心思路如下
 * 先进行排序，然后从最大的三个数开始，如果不满足三角形的三边要求则这三个元素索引集体加一，原理：数据：[a, b, c, d, e, f, g]，如果g + b > a的话（也就是能构成三角形），那么c + b > a
 * 也一定成立，那为什么不选择最大的三个a，b，c，如果a，b，c不成立的话，则直接判断b，c，d
 * @param {Array} A 
 */
var largestPerimeter = function(A) {
  function isTriangle (a, b, c) {
    return (a + b) > c && (b + c) > a && (a + c) > b
  }
  function sort (arr, start, end) {
    let i = start, j = end, temp = arr[start];
    while (i < j) {
      while (i < j && arr[j] >= temp) { j--; }
      arr[i] = arr[j];
      while (i < j && arr[i] <= temp) { i++; }
      arr[j] = arr[i];
    }
    arr[i] = temp;
    if (start < i) { sort(arr, start, i); }
    if (i + 1 < end) { sort(arr, i + 1, end); }
  }
  sort(A, 0, A.length - 1);
  for (let i = A.length - 3; i >= 0; i--) {
    if (isTriangle(A[i], A[i + 1], A[i + 2])) { return A[i] + A[i + 1] + A[i + 2]; }
  }
  return 0;
};

console.log(largestPerimeter([3,6,2,3]));