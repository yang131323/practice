function jumpFloor (num) {
  if (num <= 2) { return 1; }
  if (num === 3) { return 2; }
  return jumpFloor(num - 1) + jumpFloor(num - 3);
}

console.log(jumpFloor(100));