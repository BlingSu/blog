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
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
  if (!root) return []
  let arr = []
  help(root, 1)

  function help (root, level) {
    if (!root) return

    if (arr.length < level) {
      arr.unshift([])
    }

    let array = arr[arr.length - level]
    array.push(root.val)
    help(root.left, level + 1)
    help(root.right, level + 1)
  }

  return arr
}