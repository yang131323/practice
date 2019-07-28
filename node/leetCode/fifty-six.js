/**
 * 56. 合并区间
 * 解题思路：首先将给定的区间数组按照每个区间的起始值开始排序，排完序之后只要判断一下和前面的区间结束位置是否重合，如果重合的话那么就合并。
 * @param {Array} intervals 
 */
var merge = function(intervals) {
  function sort (start, end) {
    let i = start, j = end, temp = intervals[start];
    while (i < j) {
      while (i < j && intervals[j][0] >= temp[0]) { j--; }
      intervals[i] = intervals[j];
      while (i < j && intervals[i][0] <= temp[0]) { i++; }
      intervals[j] = intervals[i];
    }
    intervals[i] = temp;
    if (start < i) { sort(start, i); }
    if (i + 1 < end) { sort(i + 1, end); }
  }
  const len = intervals.length;
  sort(0, len - 1);
  for (let i = 0; i < intervals.length; i++) {
    if (i !== 0 && intervals[i][0] <= intervals[i - 1][1]) {
      intervals[i - 1][1] = intervals[i - 1][1] >= intervals[i][1] ? intervals[i - 1][1] : intervals[i][1];
      intervals.splice(i, 1);
      i--;
    }
  }
  return intervals;
};

var merge = function(intervals) {
  if (intervals.length <= 0) { return []; }
  intervals.sort((a, b) => {
    return a[0] - b[0];
  });
  for (let i = 0; i < intervals.length; i++) {
    if (i !== 0 && intervals[i][0] <= intervals[i - 1][1]) {
      intervals[i - 1][1] = intervals[i - 1][1] >= intervals[i][1] ? intervals[i - 1][1] : intervals[i][1];
      intervals.splice(i, 1);
      i--;
    }
  }
  return intervals;
}