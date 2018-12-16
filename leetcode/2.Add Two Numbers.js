/**
 * @question:
 *
 * You are given two non-empty linked lists representing two non-negative integers. The digits are stored in  reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 *
 * @example:
 * Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 * Output: 7 -> 0 -> 8
 * Explanation: 342 + 465 = 807.
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

const addTwoNumbers = function(l1, l2) {
  let carry = 0
  let res = new ListNode(),
      tmp = new ListNode()

  res.next = tmp

  let v1 = l1,
      v2 = l2

  while (v1 || v2) {
    let sum = (v1 ? v1.val : 0) + (v2 ? v2.val : 0) + carry
    carry = sum > 9 ? 1 : 0

    tmp.val = sum - carry * 10

    tmp.next = (v1 ? v1.next : null) || (v2 ? v2.next : null) ? (new ListNode()) : (carry == 1 ? (new ListNode(1)) : null)

    tmp = tmp.next ? tmp.next : null

    v1 = v1 ? (v1.next ? v1.next : null) : null
    v2 = v2 ? (v2.next ? v2.next : null) : null

    return res.next
  }
}


const addTwoNumbers = function(l1, l2) {
  let list = new ListNode(0),
      head = list,
      carry = 0,
      sum = 0

  while (l1 !== null || l2 !== null || sum > 0) {
    if (l1) {
      sum += l1.val
      l1 = l1.next
    }

    if (l2) {
      sum += l2.val
      l2 = l2.next
    }

    if (sum >= 10) {
      carry = 1
      sum -= 10
    }

    head.next = new ListNode(sum)
    head = head.next
    sum = carry
    carry = 0
  }

  return list.next
}
