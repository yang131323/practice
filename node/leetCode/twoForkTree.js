var isSymmetric = function(root) {
  let arr = [root, root];
  while (arr.length) {
    let nodeA = arr.shift();
    let nodeB = arr.shift();
    if (!nodeA && !nodeB) continue;
    if (!nodeA || !nodeB) { return false; }
    if (nodeA.val !== nodeB.val) { return false; }
    arr.push(nodeA.left);
    arr.push(nodeB.right);
    arr.push(nodeA.right);
    arr.push(nodeB.left);
  }
  return true;
};

console.log(isSymmetric({
  val: 2,
  right:
  {
    val: 3,
    right:
     {
       val: 4,
       right: { val: 6, right: null, left: null },
       left: null },
    left:
     {
       val: 5,
       right: { val: 8, right: null, left: null },
       left: { val: 9, right: null, left: null } } },
  left:
  {
    val: 3,
    right:
     {
       val: 5,
       right: { val: 9, right: null, left: null },
       left: { val: 8, right: null, left: null } },
    left:
     {
       val: 4,
       right: null,
       left: { val: 6, right: null, left: null } } }
}
));