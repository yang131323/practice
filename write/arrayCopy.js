/**
 * 使用from方式实现类数组拷贝
 * 注意：由于Array.from默认只能转化一层，如果想要将一个嵌套的类数组进行转化的话，必须进行递归转化
 * @param {Array} arr 
 */
function fromCopy(arr) {
  return typeof arr === 'object' ? Array.from(arr, fromCopy) : arr;
}

/**
 * 使用from方法返回指定长度的填充数组
 * 注意：这个实现得到的结果和fill得到的结果都一样，因为初始值是共用的，所有当init是对象是，每一个元素都是init 的一个引用地址的拷贝，改变一个都改变了
 * fill方法要用对象填充数组的话，必须自己写一个生成新对象的过程，使用Array.from的话只要你的初始值不是一个确定（赋值给变量名）的变量对象就会不一样
 * @param {Number} length 
 * @param {Any} init 
 */
function fillArray(length, init) {
  return Array.from({ length }, () => init);
}