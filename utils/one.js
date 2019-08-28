/**
 * 提取所有key
 * @param {Object} obj 
 */
function traver(obj) {
  if (!isObject(obj)) { return obj; }
  let s = '';
  const keys = Object.keys(obj);
  for (const x of keys) {
    if (isObject(obj[x])) {
      s = `${s} ${x} { ${traver(obj[x])} }`;
    } else {
      s = `${s} ${x}`;
    }
  }
  return s;
}