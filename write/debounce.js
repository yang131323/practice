function debounce (fn, wait = 10, immediate = false) {
  const timer = null, context = null, args = null;
  const later = () => {
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(context, args);
        context = args = null;
      }
    }, wait);

    function debounced () {
      if (!timer) {
        later();
        if (immediate) {
          fn.apply(this, arguments);
        } else {
          args = [].slice.call(arguments);
          context = this;
        }
      } else {
        clearTimeout(timer);
        later();
      }
    }
  }
  return debounced;
}

/**
 * 最终理解：参数leading是每一次起始函数都会跳过，至于怎么跳过就是根据pre的出使值来确定的，pre默认是零，如果没有给它重新赋值，那么第一判断wait - now一定小于零，
 * 也就是一点击（绑定事件）就会立即执行，如果碰到leading为false就将pre置为0，这样就可以每次都跳过点击开始，函数被调用的情况，trailing相反。
 * @param {Function} fn 
 * @param {Number} wait 
 * @param {Object} opts 
 */
function throttle (fn, wait, opts = {}) {
  let pre = 0, timer = null;
  function throttled () {
    const now = Date.now();
    if (!pre && opts.leading === false) { pre = now; }
    const remain = wait - (now - pre);
    // 因为定时器的时间是不精确的，所以会出现明明已经满足时间了，但是还没有执行
    if (remain <= 0) {
      if (timer) { clearTimeout(timer); }
      fn.apply(this, arguments);
      pre = opts.leading === false ? 0 : now;
      timer = null;
    } else if (!timer && opts.trailing !== false) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        pre = opts.leading === false ? 0 : now;
        timer = null;
      }, remain);
    }
  }
  return throttled;
}