/**
 * @author: angelasubi
 * @date: 2018-04-24
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  if (nums.indexOf(target) != -1) {
      return nums.indexOf(target)
  } else {
      nums.push(target)
      nums = nums.sort(function (a, b) {
          return a - b
      })
      return nums.indexOf(target)
  }
};