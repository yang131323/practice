/**
 * 841. 钥匙和房间
 * 解题思路：模拟整个过程，到一个房间然后就是该房间的所有钥匙，然后记录到过的每个房间（走过的不在记录），如果所有房间的钥匙都试完了，判断记录走过房间的长度是否等于房间数，
 * 这里我采用的是dfs来模拟整个过程，到一个房间后，记录该房间可以去的所有房子，然后根据队列顺序挨个去相应的房子重复就行。
 * @param {Array} rooms 
 */
var canVisitAllRooms = function(rooms) {
  const queue = [0],  passBy = new Set();
  let cur = 0;
  while (queue.length !== 0) {
    cur = queue.shift();
    if (passBy.has(cur)) { continue; }
    for (let i = 0; i < rooms[cur].length; i++) {
      queue.push(rooms[cur][i]);
    }
    if (!passBy.has(cur)) { passBy.add(cur); }
  }
  return passBy.size === rooms.length;
};