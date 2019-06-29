import { isArray, isObject, isNull, isDate, isRegEXp } from "./utils";

// 使用Proxy模拟实现数组或者使用访问器属性模拟实现数组（286）
// 个人觉得扁平化就是递归，比较喜欢concat和reduce版本

/**
 * 多维数组扁平化
 * @param {Array} arr 
 */
function flatReduce (arr) {
  return !Array.isArray(arr) ? [arr] : arr.reduce((a, b) => {
    b = Array.isArray(b) ? flatReduce(b) : [b];
    return [...a, ...b];
  }, [])
}

/**
 * 有一个缺点，所有的数据都会转化为string类型/join
 * @param {Array} arr 
 */
function flatString (arr) {
  return arr.toString().split(',');
}

/**
 * 使用concat进行数组扁平化
 * @param {Array} arr 
 */
function flatConcat(arr) {
  if (!Array.isArray(arr)) { return [arr]; }
  if (arr.some(item => Array.isArray(item))) {
    return flatConcat([].concat(...arr));
  } else { return arr; }
}

/**
 * 将数组随机打乱方式一
 * 使用数组的sort方法进行随机，不是真正的随机
 * @param {Array} arr 
 */
function randomArrayOne (arr) {
  if (!isArray(arr)) { throw new Error('argument except is a array!'); }
  return arr.sort(() => {
    return .5 - Math.random();
  });
}

/**
 * 将数组随机打乱方式二
 * 每次确定一个位置的数字-这个数字是随机确定的
 * @param {*} arr 
 */
function randomArrayTwo (arr) {
  if (!isArray(arr)) { throw new Error('argument except is a array!'); }
  let index = arr.length;
  let i, temp;
  while (index) {
    i = Math.floor(Math.random() * index--);
    temp = arr[i];
    arr[i] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

/**
 * 对数据进行深拷贝，循环引用会导致栈溢出
 * @param {Object} data // 被拷贝对象 
 * @param {Object} target // 返回对象
 */
function deepCloneOne (data, target) {
  if (!isArray(data) && !isObject(data)) { return data; }
  target = target || {};
  for (let x in data) {
    target[x] = isArray(data[x]) ? [] : {};
    target[x] = deepClone(data[x], target[x]);
  }
  return target;
}

/**
 * 对数据进行深拷贝，对循环引用进行了处理
 * @param {Object} data 被拷贝对象
 */
function deepCloneTwo (data) {
  if (!isArray(data) && !isObject(data)) { return data; } // 非对象数组已经作为基本值返回
  let parents = [];
  let childs = [];
  const _clone = parent => {
    if (isNull(parent) || (!isArray(parent) && !isObject(parent))) { return parent; }
    let child = [];
    if (isObject(parent)) {
      const temp = Object.getPrototypeOf(parent);
      child = Object.create(temp);
    }
    const index = parents.indexOf(parent);
    if (index !== -1) { return childs[index]; }
    parents.push(parent); // 必须在遍历之前放进去，因为在遍历的时候如果碰到了本次遍历遇到的属性，将无法终止
    childs.push(child); // 必须在遍历之前放进去，因为在遍历的时候如果碰到了本次遍历遇到的属性，将无法终止
    for (let x in parent) {
      child[x] = _clone(parent[x]);
    }
    return child;
  }
  return _clone(data);
}

/**
 * 深拷贝简洁完整版
 * @param {Object} obj 
 * @param {WeakMap} storage 
 */
function deepClone (obj, storage = new WeakMap()) {
  if (isDate(obj)) { return new Date(obj); }
  if (isRegEXp(obj)) { return new RegExp(obj); }
  if (obj === null || obj === undefined || !isObject(obj)) {
    return obj;
  }
  if (storage.has(obj)) { return storage.get(obj); }
  let target = Object.create(obj);
  storage.set(obj, target);
  for (let x in obj) {
    if (obj.hasOwnProperty(x)) {
      target[x] = deepClone(obj[x], storage);
    }
  }
  return target;
}