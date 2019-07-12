/**
 * @author: angelasubi
 * @date: 2018-07-12
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
 * @return {boolean}
 */
const isPalindrome = function(head) {
 let first = ''
 let second = ''
 while (head) {
   first = first + head.val
   second = head.val + second
   head = head.next
 }
 return first === second
}