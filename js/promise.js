const { isFunction, isObject } = require('./utils');

/**
 * 1. new Promise时，需要传递一个执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 
 *    和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *    如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *    如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then的参数onFulfilled和onRejected可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11. 如果 then 返回的是一个promise,那么需要等这个promise，那么会等这个promise执行完，promise如果成功，
 *     就走下一个then的成功，如果失败，就走下一个then的失败
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function Promise (executor) {
  const self = this;
  self.onFulfiled = [];
  self.onRejected = [];
  self.status = PENDING;

  function resolve (value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfiled.forEach((item) => {
        // 为什么不需要带值, 在进入队列的时候已经传入值
        item();
      })
    }
  }

  function reject (reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejected.forEach((item) => {
        // 为什么不需要带值, 在进入队列的时候已经传入值
        item()
      })
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onFulfiled, onRejected) {
  const self = this;
  onFulfiled = isFunction(onFulfiled) ? onFulfiled : value => value;
  onRejected = isFunction(onRejected) ? onRejected : reason => { throw reason; }

  const promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          const x = onFulfiled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          const x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else {
      self.onFulfiled.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfiled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  })
  return promise2;
}

function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) {
    // 这里需要reject状态，而且需要是TypeError类型
    reject(new TypeError('Circle interfence!'));
  }
  let used = false;
  if (x && (isFunction(x) || isObject(x))) {
    try {
      const then = x.then
      if (isFunction(then)) {
        then.call(x, y => {
          if (used) { return; }
          used = true;
          resolvePromise(promise2, y, resolve, reject);
        }, reason => {
          if (used) { return; }
          used = true;
          reject(reason);
        })
      } else {
        if (used) { return; }
        used = true;
        resolve(x);
      }
    } catch (e) {
      // 这里忘记加了？
      if (used) { return; }
      used = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}


Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}


Promise.prototype.all = function (promises) {
  return new Promise((resolve, reject) => {
    promises = Array.from(promises);
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    const len = promises.length;
    let result = [], index = 0;
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then((data) => {
        result[i] = data;
        if (++index === len) { resolve(result); }
      }).catch((e) => {
        reject(e);
      })
    }
  })
}

module.exports = Promise;