// 数组去重可以使用双重循环、indexOf/find、sort+indexOf、set、object、map
// 本文件夹只实现set、map和object三种

/**
 * 使用ES6的Set进行去重
 * @param {Array} arr
 * @returns {Array}
 */
function setFun (arr) {
  return [...new Set(arr)];
}

/**
 * 使用对象key（typeof + item）过滤
 * @param {Array} arr
 * @returns {Array}
 */
function objectFun (arr) {
  let obj = {};
  let result = [];
  arr.forEach(ele => {
    if (!obj[(typeof ele) + ele]) {
      obj[(typeof ele) + ele] = true;
      result.push(ele);
    } 
  });
  return result;
}

/**
 * 使用Map进行过滤重复值
 * @param {*} arr
 * @returns {Array}
 */
function mapFun (arr) {
  let mp = new Map();
  return arr.filter((a) => {
    return !mp.has(a) && mp.set(a, 1);
  });
}