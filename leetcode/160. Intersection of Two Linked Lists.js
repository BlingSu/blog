/**
 * @author: angelasubi
 * @date: 2018-05-05
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
let getIntersectionNode = function(headA, headB) {
  let lenA = getLen(headA)
  let lenB = getLen(headB)

  if (lenA === 0 || lenB === 0) {
    return null
  }

  while (lenA > lenB) {
    headA = headA.next
    lenA--
  }
  while (lenB > lenA) {
    headB = headB.next
    lenB--
  }
  while (lenA && lenB) {
    if (headB === headA) {
      return headA
    }
    headA = headA.next
    headB = headB.next
  }
  return null
};

let getLen = function (head) {
  let len = 0
  while (head) {
    head = head.next
    len++
  }
  return len
}