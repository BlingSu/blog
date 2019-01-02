/**
 * @author: angelasubi
 * @dateL 2019-01-02
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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {

  let p = new ListNode(x-1)
  p.next = head

  console.log(p)
  console.log(head)

  head = p

  let pre

  while(p !== null && p.val < x){
    pre = p
    p = p.next
  }

  if(p !== null){
    let cur = pre

    while(p !== null) {

      if(p.val < x){

        let temp = cur.next
        pre.next = p.next
        cur.next = p
        cur = p
        p.next = temp
        p = pre
      }

      pre = p
      p = p.next
    }
  }

  temp = head
  head = head.next

  return head
};
