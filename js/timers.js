let timeIdKey = {}

/**
 * 使用setTimeout函数模拟setInterval函数，可以进行封装，使myInterval和myClearInterval函数属于一个对象
 * 同时也可以将timeIdKey对象封装在对象中
 * @param {Function} fn 
 * @param {Number} delay 
 */
function myInterval (fn, delay) {
  const timeKey = Symbol('timer key');
  function interval (fn, delay) {
    const timeId = setTimeout(() => {
      fn();
      interval(fn, delay);
    }, delay);
    timeIdKey[timeKey] = timeId;
  }
  interval(fn, delay);
  return timeKey;
}

function myClearInterVal (timerId) {
  if (timerId in timeIdKey) {
    clearTimeout(timeIdKey[timerId]);
    delete timeIdKey[timerId];
  }
}