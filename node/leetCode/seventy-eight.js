/**
 * 78. 子集
 * 解题思路：把整个过程想成遍历一棵树，然后遍历树的过程就是生成子集的过程，例如：[1, 2, 3]，在每层有1，2，3三种可能，每层选择之后又是三种可能，但是这里要的是组合（和顺序无关），
 * 所以我们可以过滤下一层的可能性，如果第一层是从索引0开始，那么以1为根的子树只能从索引1开始，以以1为根的第二层就只有两个（2， 3）选择了，在第二层选择2之后，第三层就只能从索引2开始
 * 如果第二层选择3，那么第三层将没有元素可选，以1为根的子树遍历完毕，然后遍历以2，3为根的子树，原理相似，每棵子树的遍历过程都记录下来，最后加上空集就是结果。以1的子树为例，遍历过程
 * 记录的结果是这样的：[1], [1, 2], [1, 2, 3], [1, 3]，2的子树遍历过程记录的结果是这样的：[2], [2, 3]，3的子树遍历过程记录的结果是这样的：[3]；还有一种解题方法，就是将一个nums的长度
 * 使用二进制表示，有多少个元素就使用多少个二进制表示，然后选用这一串字符串为一的元素，遍历完所有情况就是结果，还是使用上面例子，使用二进制表示是这样的：000，001， 010，011，100，101，110，111，、
 * 最后凑成的解果就为：[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]
 * @param {Array} nums
 */
var subsets = function(nums) {
  const result = [];
  result.push([]);
  function traves (arr, start) {
    if (arr.length !== 0) { result.push(arr.slice(0)); }
    if (start >= nums.length) { return; }
    for (let i = start; i < nums.length; i++) {
      traves(arr.concat(nums[i]), i + 1);
    }
  }

  for (let i = 0; i < nums.length; i++) {
    traves([nums[i]], i + 1);
  }

  return result;
};

console.log(subsets([1,2,3]));

// 获取所有排列
var subsetsOne = function(nums) {
  const result = [];
  result.push([]);
  function convert (i, j) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }

  function traves (start, len) {
    if (start === len) {
      result.push(nums.slice(0, len));
      return;
    }
    for (let i = start; i < nums.length; i++) {
      convert(start, i);
      traves(start + 1, len);
      convert(start, i);
    }
  }

  for (let i = 1; i <= nums.length; i++) {
    traves(0, i);
  }
  return result;
};