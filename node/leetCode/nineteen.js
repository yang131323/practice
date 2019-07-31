/**
 * 19. 删除链表的倒数第N个节点
 * 解题思路：将链表遍历一遍，然后记录下来每一个节点的当前指针，删除倒数第n个就只要拿到n - 1，然后指向n + 1就可以了，当然还有边缘情况，第一个和最后一个；
 * 这种方法比较消耗内存，可以只存储n + 1个节点，这样可以减少一些内存，还有一种方法就是使用两个指针，两个指针之间相差n个元素。
 * @param {Objecct} head 
 * @param {Number} n 
 */
var removeNthFromEnd = function(head, n) {
  let temp = [], h = head;
  while (h) {
    temp.push(h);
    h = h.next;
  }
  const len = temp.length - n;
  if (len < 0 || len > temp.length) { return head; }
  len - 1 >= 0 ? (temp[len - 1].next = temp[len + 1]) : (head = head.next);
  return head;
};