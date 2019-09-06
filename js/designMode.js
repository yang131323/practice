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
  for (let i in data) {
    if (rule[i] && data.hasOwnProperty(rule[i])) {
      throw new Error(`转换过程中发现键冲突，在rule中key：${i}，想转换为: ${rule[i]}`);
    } else if (rule[i] && !data.hasOwnProperty(rule[i])) {
      data[rule[i]] = data[i];
      delete data[i];
    } else {
      data[i] = data[i];
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

/**
 * 单例模式（IIFE）
 */
const singleMode = (function () {
  let isInstance = null;
  return function (name, id, age) {
    if (!new.target) { throw new Error('This is a Constructor Function, please use new keyword!'); }
    if (isInstance) { return isInstance; }
    this.name = name;
    this.id = id;
    this.age = age;
    isInstance = this;
  }
}())


/**
 * 观察者模式/Subject类，必须使用new关键字进行实例化
 * 观察者模式：维护一个依赖列表，当内容更新时主动通知，依赖列表里面的所有Observe。
 */
function Subject () {
  if (!new.target) { throw new Error('This is a Constructor Function, please use new keyword!'); }
  this.list = [];
}

/**
 * 由于每个Subject都有添加、删除和通知功能，为了节省资源消耗，所有实例共享这些方法。
 * 但是重写prototype会丢失constructor属性，因此需要给constructor重新赋值
 */
Subject.prototype = {
  constructor: Subject,
  add (observe) {
    this.list.push(observe);
  },
  remove (observe) {
    let isAdd = this.list.indexOf(observe);
    if (isAdd === -1) { throw new Error('you not have add Observe!'); }
    this.list.splice(isAdd, 1);
  },
  notify (notice) {
    let len = this.list.length;
    for (let i = 0; i < len; i++) {
      this.list[i].update(notice);
    }
  }
}

/**
 * 观察者模式/Observe类，必须使用new关键字进行实例化
 * @param {String} name Observe名字
 */
function Observe (name) {
  if (!new.target) { throw new Error('This is a Constructor Function, please use new keyword!'); }
  this.name = name;
}

/**
 * 由于每个Observe都有update消息功能，为了节省资源消耗，所有实例共享这个方法。
 * 但是重写prototype会丢失constructor属性，因此需要给constructor重新赋值
 */
Observe.prototype = {
  constructor: Observe,
  update (notice) {
    console.log('My name is ' + this.name + ', I attention "' + notice + '" ready update!');
  }
}

/**
 * 发布-订阅模式
 * 发布订阅模式：与观察者的区别在于发布订阅不直接与发布者关联，它有一个调度中心
 * 订阅者只管在调度中心订阅就行，发布者只需要在调度中心发布通知。
 */
const PublishSubscribe = new class {
  constructor () {
    this.subscribeCenter = {}
  }
  publish (event, mes) {
    if (!(event in this.subscribeCenter)) {
      alert('not subscriber!');
      return;
    }
    const subscribes = this.subscribeCenter[event];
    const len = subscribes.length;
    for (let i = 0; i < len; i++) {
      subscribes[i].notice(mes);
    }
  }
  subscribe (event, sub) {
    if (!this.subscribeCenter[event]) { this.subscribeCenter[event] = []; }
    this.subscribeCenter[event].push(sub);
  }
  unSubscribe (event, sub) {
    const haveEvent = event in this.subscribeCenter;
    const isHave = this.subscribeCenter[event].indexOf(sub)
    if (!haveEvent || !~isHave) {
      alert('you not subscribe: ' + event);
      return;
    }
    this.subscribeCenter[event].splice(isHave, 1);
  }
}

/**
 * 订阅者类，必须使用new关键字进行实例化
 * @param {String} name Subscribe名字
 */
function Subscribe (name) {
  if (!new.target) { throw new Error('This is a Constructor Function, please use new keyword!'); }
  this.name = name;
}

/**
 * 由于每个订阅者都有notice消息功能，为了节省资源消耗，所有实例共享这个方法。
 * 但是重写prototype会丢失constructor属性，因此需要给constructor重新赋值
 */
Subscribe.prototype = {
  constructor: Subscribe,
  notice (mes) {
    console.log('My name is ' + this.name + ', I attention "' + mes + '" ready update!');
  }
}