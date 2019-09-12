let funs = [], max = [-Infinity, -Infinity];

function cal (k, b, point, x = 0) {
  if (k === null) { return point.x > x ? 'big' : (point.x === x ? 'eq' : 'small'); }
  if (k === 0) { return point.y > b ? 'big' : (point.y === b ? 'eq' : 'small'); }
  const left = k * point.x + b;
  const right = point.y;
  return right > left ? 'big' : (right === left ? 'eq' : 'small');
}

function funArgs (point1, point2) {
  const k =  (point2.x - point1.x === 0) ? null : (point2.y - point1.y) / (point2.x - point1.x);
  const b = point1.y - (k * point1.x);
  const judge = point1.x <= max[0] && point2 <= max[0] && point2.y <= max[1] && point1.y <= max[1];
  return {k, b, x: point1.x, judge};
}

function judge (re, situ) {
  if (situ) {
    return re === 'big' || re === 'eq';
  } else {
    return re === 'small' || re === 'eq';
  }
}

function isInCity (site) {
  const len = funs.length;
  for (let i = 0; i < len; i++) {
    const result = cal(funs[i].k. funs[i].b, site, funs[i].x);
    if (judge(result, funs.judge)) {
      console.log(false);
      // print(false);
      break;
    }
  }
  console.log(true);
  // print(true);
}

function getData () {
  let line;
  while (line = read_line()) {
    funs = [];
    max = [-Infinity, -Infinity]
    const arr = line.trim().split(' ');
    let point;
    arr.forEach((val, idx) => {
      point = val.split(',');
      if (Number(point[0]) > max[0]) { max[0] = point[0]; }
      if (Number(point[1]) > max[1]) { max[1] = point[1]; }
      arr[idx] = {
        x: Number(point[0]),
        y: Number(point[1])
      }
    });
    const site = arr.shift();
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      if (i === len - 1) {
        funs.push(funArgs(arr[i], arr[0]));
        continue;
      }
      funs.push(funArgs(arr[i], arr[i + 1]));
    }
    isInCity(site);
  }
}