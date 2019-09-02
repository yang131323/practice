
/**
 * 工具函数，判断是否为数组或对象
 * @param {any} val 
 */
function isFunctionOrObject(val) {
  return typeof val === 'function' || typeof val === 'object';
}

/**
 * 工具函数，判断是函数
 * @param {any} val 
 */
function isFunction(val) {
  return typeof val === 'function';
}

const PEDDING = 'pedding';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
/**
 * 1. Promise构造函数接受一个执行器，立即执行。
 * 2. excutor接受两个参数，resolve函数和reject函数。
 * 3. promise只能从pedding状态变为fulfilled状态和rejected状态。
 * 4. promise的状态一旦确定就无法改变，原因在于第3点。
 * 5. 每个promise都有then函数，then函数接受两个参数，一个promise成功回调函数onFulfilled，
 *    一个promise失败回调函数onRejected。
 * 6. then的两个参数都可以缺省，onFulfilled、onRejected函数可以缺省。
 * 7. 如果then函数返回一个结果，那么将会把结果值传递给下一个then的成功回调函数。
 * 8. 如果then函数执行的时候发生了错误，那么将会将发生错误的原因传递给下一个then的失败回调函数。
 * 9. 如果then函数的执行结果是一个promise，需要等待promise执行完，如果promise的完成状态为fulfilled的，
 *    则执行onFulfilled函数，如果promise的函数完成状态为rejected状态，则执行onReject函数。
 * 10. 如果promise的状态已经是fulfilled状态直接执行onfulfilled函数，如果promise的状态是rejected状态，
 *    直接执行onRejected函数，否则的话将onfulfilled函数或者onRejected函数加入回调，等待条件满足的时候再执行。
 * 11. then函数返回一个promise，一个promise函数可以then多次。
 * @param {Function} excutor 执行器
 */
function Promise (excutor) { // 实现第一点
  const self = this;
  this.onRejected = [];
  this.onFulfilled = [];
  this.status = PEDDING;
  // this.value = null;
  // this.reason = null;

  function resolve (val) {
    // 实现第三点
    if (self.status === PEDDING) {
      self.status = FULFILLED;
      self.value = val;
      self.onFulfilled.forEach(item => {
        item();
      });
    }
  }

  function reject (reason) {
    // 实现第三点
    if (self.status === PEDDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejected.forEach(item => {
        item();
      });
    }
  }
  // 实现第一点和第二点
  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
};

// 实现第五点
Promise.prototype.then = function then (onFulfilled, onRejected) {
  // 实现第六点
  onFulfilled = !isFunction(onFulfilled) ? val => val : onFulfilled; // 实现有问题，可以从该函数的执行处看出问题
  onRejected = !isFunction(onRejected) ? reason => { throw reason } : onRejected; // 实现有问题，可以从该函数的执行处看出问题
  const self = this;

  // 实现第十一点
  const thenPromise = new Promise((resolve, reject) => {
    // 实现第十点
    if (self.status === FULFILLED) {
      // then接受的参数是异步执行的
      setTimeout(() => {
        try {
          const x = onFulfilled(self.value);
          resolvePromise(thenPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          const x = onRejected(self.reason);
          resolvePromise(thenPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    } else if (self.status === PEDDING) {
      self.onFulfilled.push(() =>
        {
          setTimeout(() => {
            try {
              const x = onFulfilled(self.value);
              resolvePromise(thenPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        }
      );
      self.onRejected.push(() =>
        {
          setTimeout(() => {
            try {
              const x = onRejected(self.reason);
              resolvePromise(thenPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        }
      )
    }
  })
  return thenPromise;
}

// 实现第十一点
function resolvePromise(pro, x, resolve, reject) {
  if (pro === x) {
    reject(new TypeError('Don‘t not chain call'));
  }
  let used = false;
  if (x && isFunctionOrObject(x)) {
    try {
      const then = x.then;
      if (isFunction(then)) {
        then.call(x, y => {
          if (used) { return; }
          used = true;
          resolvePromise(pro, y, resolve, reject);
        }, reason => {
          if (used) { return; }
          used = true;
          reject(reason);
        });
      } else {
        if (used) { return; }
        used = true;
        resolve(x);
      }
    } catch (e) {
      if (used) { return; }
      used = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

/**
 * all方法的功能：
 * 1. 传入的所有元素完成状态变为fulfilled，返回的promise状态才为fulfilled；
 * 2. 传入的所有元素一旦有一个状态变为rejected，返回的promise状态就会被置为rejected。
 * all方法的特性：
 * 1. 传入的参数是一个可迭代的空对象，那么将会以同步的方式返回一个fulfilled状态的promise；
 * 2. 传入的参数如果没有promise，那么将会以异步的方式返回一个fulfilled状态的promise；
 * 3. 其他情况下，异步返回一个处理中（Pedding）状态的promise
 */
Promise.all = function all(promises) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(promises) && promises.length === 0) {
      resolve(promises);
      return;
    }
    const result = [], len = promises.length;
    promises = Array.from(promises);
    let num = 0;
    for (let i = 0; i < len; i++) {
      // 使用Promise.resolve原因在于传入的promises中有可能存在不是promise的元素
      Promise.resolve(promises[i]).then(val => {
        // 不能使用push，因为需要和传入的promises的顺序对应返回promise响应信息
        result[i] = val;
        if (++num === len) { resolve(result); } 
      }, reason => {
        reject(reason);
      })
    }
  });
}

/**
 * Promise.resolve方法的功能：返回一个指定值解析后的Promise对象
 * resolve方法的特性：
 *  1. 当传入的参数就是一个promise对象时，将原封不动的将这个对象返回。
 *  2. 当传入的参数是一个thenable对象（含有then方法的对象）时，最终的状态将跟随thenable对象，由thenable对象的then方法决定
 *  3. 否则将直接返回以传入参数为成功状态的Promise。
 * @param {*} param
 */
Promise.resolve = function resolve(param) {
  if (param instanceof Promise) { return param; }
  return new Promise((resolve, reject) => {
    if (param && param.then && isFunction(param.then)) {
      // 根据原生Promise.resovle方法测试结果得出thenable对象要在其他两种情况之后执行
      setTimeout(() => {
        param.then(resovle, reject);
      });
    } else {
      resolve(param);
    }
  });
}

/**
 * reject方法功能：返回一个以给定的promise对象
 * @param {*} param
 */
Promise.reject = function reject(param) {
  return new Promise((resovle, reject) => {
    reject(param);
  });
}

/**
 * catch是特殊的then方法，只是没有onFulfilled方法。
 */
Promise.prototype.catch = function (fn) {
  return this.then(null, fn);
}

/**
 * 因为finally不管成功失败都会执行，那么就需要借助then方法，将在then方法中都需要实现
 * 回调执行的代码，同时finally会原封不动的将值返回给下一个then函数，可以在实现中看出finally回调函数中返回的值将会被下一个then忽略掉，
 * 会将绑定finally函数时的promise的值返回作为finally函数后面的then函数回调函数的参数。
 */
Promise.prototype.finally = function (callback) {
  return this.then(val => {
    Promise.resolve(callback()).then(() => val);
  }, reason => {
    Promise.resovle(callback()).then(() => {
      throw reason;
    });
  });
}

/**
 * race返回一个Promise对象，返回Promise的状态由第一个Promise完成状态来决定，如果第一个Promise完成状态是
 * fulfilled，那么返回的promise状态也是fulfilled，否则想反。
 */
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises = Array.from(promises);
    if (promises.length) { return; }
    for (const x of promises) {
      Promise.resolve(x).then(val => resolve(val), reason => reject(reason))
    }
  })
}