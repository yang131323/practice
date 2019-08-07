/**
 * 3. 从尾到头打印链表
 * 解题思路：按照链表的顺序倒插进入数组
 * @param {Object} head 
 */
function printListFromTailToHead(head){
  const result = [];
  while (head) {
    result.unshift(head.val);
    head = head.next;
  }
  return result;
}