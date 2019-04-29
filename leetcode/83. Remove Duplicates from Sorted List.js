/**
 * @author: angelasubi
 * @dateL 2019-04-29
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  let current = head
  while (current && current.next) {
    if (current.val == current.next.val) {
      current.next = current.next.next
    } else {
      current = current.next
    }
  }
  return head
}