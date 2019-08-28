
function throttling (fn, wait = 100) {
  const pre = null, result = null, timer = null;
  
  function later (context, arg) {
    timer = setTimeout(() => {
      result = fn.apply(context, arg);
    }, wait);
  }

  function throtted () {
    if (!pre && !timer) { pre = Date.now(); }
    const args = [].slice.call(arguments)
    const time = Date.now() - pre;
    if (time >= wait) {
      result = fn.apply(this, args);
      clearTimeout(timer);
      args = null;
    } else if (!timer) {
      later(this, args);
    }
  }
  return result;
}

function debounce (fn, wait = 100) {
  if (typeof fn !== 'function') { throw new TypeError('请传入函数'); }
  let timer = null, result = null;
  function later (context, arg) {
    timer = setTimeout(() => {
      result = fn.apply(context, arg);
    }, wait);
  }

  function debounced () {
    const args = [].slice.call(arguments);
    if (timer) { clearTimeout(timer); }
    later(this, args);
    return result;
  }

  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  }

  return debounced;
}