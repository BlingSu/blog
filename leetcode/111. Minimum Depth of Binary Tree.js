/**
 * @author: angelasubi
 * @date 2019-04-30
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
var minDepth = function(root) {
  if (root === null) return 0
  if (!root.left && !root.right) return 1
  if (!root.left) return minDepth(root.right) + 1
  if (!root.right) return minDepth(root.left) + 1
  let depthLeft = minDepth(root.left)
  let depthRight = minDepth(root.right)
    
  return Math.min(depthLeft, depthRight) + 1
}