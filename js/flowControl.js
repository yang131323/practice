/**
 * 防抖函数
 * @param {Function} fn 
 * @param {Number} wait 
 * @param {Boolean} immediate 
 */
function debounce (fn, wait, immediate = false) {
  let result = null, timer = null;
  let later = function (context, params) {
    timer = setTimeout(() => {
      result = fn.apply(context, params);
      // 让内存回收，防止内存泄漏
      context = params = null;
    }, wait)
  }
  let debounced = function (...args) {
    if (immediate) {
      result = fn.apply(this, args);
    } else if (!timer) {
      later(this, args);
    } else {
      clearTimeout(timer);
      later(this, args);
    }
    return result;
  }
  debounced.cancel = function () {
    clearTimeout(timer);
    // 让内存回收，防止内存泄漏
    timer = null;
  }
  return debounced;
}

/**
 * 节流函数
 * @param {Function} fn 
 * @param {Number} wait 
 * @param {Object} options 
 */
function throttle (fn, wait, options = {}) {
  let previous = 0, timer = null, context = null, result = null;
  let later = function (params) {
    result = fn.apply(context, params);
    previous = Date.now();
    timer = context = null;
  }
  let throttled  = function (...args) {
    const now = Date.now();
    if (!previous && options.leading === false) { previous = now; }
    context = this;
    const cur = wait - (now - previous);
    if (cur <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      result = fn.apply(context, args);
      previous = now;
      context = null;
    } else if (!timer && options.trailling !== false) {
      timer = setTimeout(later, wait);
    }
    return result;
  }
  return throttled;
}