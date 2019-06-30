function all (promises) {
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