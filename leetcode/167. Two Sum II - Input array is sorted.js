/**
 * @author: angelasubi
 * @date: 2018-05-05
 */

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
let twoSum = function(numbers, target) {
  let hashMap = {}
  for (let i = 0; i < numbers.length; i++) {
    let current = target - numbers[i]
    if (hashMap[current] !== undefined) {
      let before = hashMap[current] + 1
      return  [before, i + 1]
    }
    hashMap[numbers[i]] = i
  }
}