/**
 * 1122. 数组的相对排序
 * 解题思路：由于arr2中没有存在的元素最终还是要以升序的方式进行排序，因此直接把arr1进行排序，这样我们在查找重复元素索引的时候更方便，剩下的就是遍历arr2数组，然后将arr1的元素放入结果中
 * @param {Array} arr1 
 * @param {Array} arr2 
 */
var relativeSortArray = function(arr1, arr2) {
  function sort(arr, start, end) {
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
  sort(arr1, 0, arr1.length - 1);
  let index = -1, next = -1, result = [];
  for (let i = 0; i < arr2.length; i++) {
    next = index = arr1.indexOf(arr2[i]);
    if (index === -1) { continue; }
    while (arr1[++next] === arr1[index]) { continue; }
    result = result.concat(arr1.splice(index, next - index));
  }
  result.push(...arr1);
  return result;
};

console.log(relativeSortArray([2,3,1,3,2,4,6,7,9,2,19], [2,1,4,3,9,6]));