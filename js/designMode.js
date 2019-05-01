/**
 * 适配器模式
 * 场景：假设后台和前端对接数据，一般来说前端与后台协商的字段不会轻易变动，
 * 但是这只是一种协商而已。因此一旦后台某个字段改变了，刚好前端有几十
 * 甚者上百个地方使用了，如果一个个改。。。。
 * 使用适配器模式将可以化解这种尴尬，只有只考虑一层，多层思想一样
 * @param {Object} obj
 * @returns {Object}
 */
function adapter (obj) {
  const data = obj.data || {
    price: 0,
    num: 0,
    vender: 'changde',
    name: 'chrome',
    id: '68.0.0'
  };
  const rule = obj.rule || {
    vender: 'produce'
  }
  obj = obj.data;
  for (let i in data) {
    if (rule[i]) {
      data[i] = (rule[i] in obj) ? obj[rule[i]] : data[i];
    } else {
      data[i] = (i in obj) ? obj[i] : data[i];
    }
  }
  return data;
}

/**
 * 装饰器模式
 * 场景：假设有一个dom当点击它的时候调用某一个函数，现在需求改变（在你写好之后），现在要增加
 * 某个操作。当然只有一个地方使用你可以直接改一改就行，但是情况并不是你想的那样，有上百的dom
 * 都有这个需求，这时候你一个个的改？
 * @param {String} id 
 * @param {Function} fn 
 */
function decarator (id, fn) {
  const dom = document.getElementById(id);
  if (typeof dom.onclick === 'function') {
    const temp = dom.onclick;
    dom.onclick = function () {
      temp();
      fn()
    }
  } else {
    dom.onclick = fn;
  }
}
