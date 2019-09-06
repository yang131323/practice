/**
 * 原型链继承：利用原型，使一个引用类型继承另一个引用类型的属性和方法
 * 缺点：
 * 1. 原型是另一个类型的实例，原本的实例属性变成当前类型的原型属性或者方法，所有实例共享原型上所有引用类型属性，一个改动影响所有实例。
 * 2. 在创建实例，无法在不影响其他实例时给父类构造函数传递参数。
 */
function proParent () {
  this.type = 'prototype';
  this.friend = ['xiao', 'ming'];
}

proParent.prototype.isWho = function () {
  console.log('I am your father!');
}

proParent.prototype.sayHello = function () {
  console.log('Hi, Good morning!');
}

function proChild (name, id) {
  if (!this instanceof proChild) { throw Error('This is constructor, please use "new" caller!'); }
  this.name = name;
  this.id = id;
}

proChild.prototype = new proParent();
proChild.prototype.constructor = proChild;

/**
 * 构造函数继承：在子类构造函数中调用父类构造函数
 * 1. 解决所有实例共享父类引用属性问题。
 * 2. 可以像父类构造函数传递参数。
 * 缺点：
 * 1. 无法继承父类原型上的属性，每次都会新建父类中的所用实例属性，复用性不高。
 * @param {String} name 
 * @param {Number} id 
 */
function ConstrutorParent(name, id) {
  this.name = name;
  this.id = id;
}

ConstrutorParent.prototype.isWho = function () {
  console.log('I am your father!');
}

function ConstrutorChild (name, id, type) {
  ConstrutorParent.call(this, name, id);
  this.type = type;
}

/**
 * 构造原型组合继承：集合构造函数继承和原型链继承的优点。
 * 缺点：
 * 1. 任意时候都会调用两次父类构造函数，一次是在继承原型时，一次是在继承实例属性时。
 * 优点：解决了原型链继承和构造函数继承的问题。
 * @param {String} name 
 * @param {Number} id 
 */
function ConAndProParent(name, id) {
  this.name = name;
  this.id = id;
}

ConAndProParent.prototype.isWho = function () {
  console.log('I am your father!');
}

function ConAndProChild (name, id, type) {
  ConstrutorParent.call(this, name, id);
  this.type = type;
}

ConAndProChild.prototype = new ConAndProParent('is Q', 25);
ConAndProChild.prototype.constructor = ConAndProChild;

/**
 * 原型式继承：基于原有对象创建新对象，把原有对象作为新建对象的__proto__（原型对象）
 * 缺点：
 * 1. 如果原型上拥有引用属性，所有的实例共享。
 * @param {Object} parent 
 */
function object (parent) {
  function child () {};
  child.prototype = parent;
  return new child();
}

/**
 * 寄生式继承：利用原有对象创建新对象时，然后在新对象上添加属性
 * 缺点：
 * 1. 如果原型上拥有引用属性，所有的实例共享。
 * @param {Object} parent
 */
function Parasitic (parent) {
  const obj = object(parent);
  obj.child = 'I am a Child!';
  return obj;
}

/**
 * 寄生组合式继承：通过构造函数来继承实例属性，通过原型链来继承通用方法和属性，实现一个工具函数，基于父类的原型对象创建子类的原型（使用原型继承），然后修改constructor为子类构造函数，修改子类原型
 * 优点：
 * 1. 可以像父类构造传递参数，解决了引用属性共享问题。
 */
