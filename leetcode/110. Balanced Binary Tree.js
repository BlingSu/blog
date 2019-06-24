/**
 * @author: angelasubi
 * @date 2019-06-24
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isBalanced = function(root) {
  if (root == null || (root.right == null && root.left == null)) {
    return true
  }
  let left = findDeep(root.left)
  let right = findDeep(root.right)
  let diff = Math.abs(left - right) <= 1

  return diff && isBalanced(root.left) && isBalanced(root.right)
}

function findDeep (root) {
  if (root == null) {
    return 0
  }
  let left = findDeep(root.left) + 1
  let right = findDeep(root.right) + 1

  return left > right ? left : right
}