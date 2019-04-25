/**
 * @author: angelasubi
 * @date: 2018-04-25
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  if (nums.length == 0) return 0
  var max = nums[0] > 0 ? 0 : nums[0]
  var cur = nums[0] > 0 ? 0 : nums[0]
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > cur + nums[i]) {
    cur = nums[i]
    } else {
    cur += nums[i]
    }
    if (cur > max) {
    max = cur
    }
  }
  return max
}