/**
 * 21. 合并两个有序链表
 * 解题思路：借用其中的一个链表进行排序，由于链表的元素是一个对象，因此在用一个临时变量存储的时候，存储的是一个引用，当你改变它的值得时候，临时变量存储的值也会改变，索引可以使用一个
 * 浅拷贝解决这个问题，最后考虑一下边缘情况就可以了：l1、l2为空或者在比较的过程中l1或者l2为空的时候
 * @param {Object} l1 
 * @param {Object} l2 
 */
var mergeTwoLists = function(l1, l2) {
  if (!l1) { return l2; }
  if (!l2) { return l1; }
  let c1 = l1, c2 = l2, temp = null;
  while (c1 || c2) {
    if (c1.val > c2.val) {
      temp = Object.assign({}, c1);
      c1.val = c2.val;
      c1.next = temp;
      c2 = c2.next;
    }
    if (!c1.next) {
      c1.next = c2;
      break;
    }
    if (!c2) { break; }
    c1 = c1.next;
  }
  return l1;
};