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
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (!head) return false
    let faster = head
    let slower = head
    while (faster && faster.next) {
        faster = faster.next.next
        slower = slower.next
        if (slower === faster) return true
    }
    return false
}