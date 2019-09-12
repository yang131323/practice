const readline = require('readline');

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

let readNum = 1, graph= [], n;

rl.on('line', function line (line) {
  switch (readNum) {
    case 1: 
      n = Number(line.trim());
      break;
    default:
      const temp = line.trim().split(' ').map(val => Number(val));
      graph.push(temp);
      break;
  }
  if (readNum === n + 1) { operateResult(); }
  readNum++;
})

function operateResult () {
  const deep = graph[0] && graph[0].length;
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push([]);
    for (let j = 0; j < deep; j++) {
      if (graph[i][j] === 0) { continue; }
      if (!graph[i][j]) { break; }
      let len = result[i].length > 0 ? (result[i].length - 1): 0;
      if (result[i].length <= 0 || result[i][len] !== graph[i][j]) {
        result[i][len] === 0 ? (result[i][len] = graph[i][j]) : (result[i].push(graph[i][j]));
        continue;
      }
      if (result[i][len] === graph[i][j]) {
        result[i][len] = result[i][len] * 2;
        result[i].push(0);
      }
    }
    const len = result.length - 1;
    const valid = result[len].length;
    result[len].length = deep;
    result[len].fill(0, valid);
  }
  for (let i = 0; i < n; i++) {
    console.log(result[i].join(' '));
  }
}

// operateResult(4, ) n = 4, reuslt