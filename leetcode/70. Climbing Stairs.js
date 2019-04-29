/**
 * @author: angelasubi
 * @dateL 2019-04-29
 */

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  if (n === 0 || n === 1 || n === 2) {
    return n
  }
  let step1 = 1,
      step2 = 2,
      i = 3,
      steps
  
  while (i <= n) {
    steps = step1 + step2
    step1 = step2
    step2 = steps
    i++
  }
  return steps
}