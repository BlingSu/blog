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
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
  if (!root) return false
	let current = sum - root.val
	if (!root.left && !root.right && current == 0) return true
	if (!root.left) return hasPathSum(root.right, current)
	if (!root.right) return hasPathSum(root.left, current)
	return hasPathSum(root.left, current) || hasPathSum(root.right, current)
}