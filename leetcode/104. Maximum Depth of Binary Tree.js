/**
 * @author: angelasubi
 * @dateL 2019-04-30
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
 * @return {number}
 */
var maxDepth = function(root) {
  if (root === null) return 0
  let depthLeft = maxDepth(root.left)
  let depthRight = maxDepth(root.right)
  
  return Math.max(depthLeft, depthRight) + 1
}