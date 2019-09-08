function debounce (fn, wait = 10) {
  let timer = null, args = [].slice.call(arguments, 2);
  function debounced () {
    let arg = [].slice.call(arguments);
    arg = arg.concat(args);
    if (timer) { clearTimeout(timer); }
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, wait);
  }
  
  debounced.cancel = function () {
    if (timer) { clearTimeout(timer); }
  }

  return debounced;
}

function throttle (fn, wait = 10) {
  let timer = null, pre = 0, args = [].slice.call(arguments, 2);
  function throttled () {
    let arg = [].slice.call(arguments);
    arg = arg.concat(args);
    if (!timer && !pre) { pre = Date.now(); }
    const restTime = Date.now() - pre;
    if (restTime >= wait) {
      if (timer) { clearTimeout(timer); }
      fn.call(this, arg);
      pre = Date.now();
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, arg);
        pre = Date.now();
      }, wait);
    }
  }
  return throttled;
}