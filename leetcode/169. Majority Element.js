/**
 * @author: angelasubi
 * @date 2019-06-24
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = function(nums) {
  let count = 1
  let map = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (map == nums[i]) {
      count++
    } else {
      count--
      if (count == 0) {
        map = nums[i + 1]
      }
    }
  }
  return map
}