/**
 * @author angelasubi
 * @date 2019-07-03
 */

/**
 * @param {number} n
 * @return {number}
 */
let trailingZeroes = function(n) {
  let total = 0
  while (n >= 5) {
    n = Math.floor(n / 5)
    total += n
  }
  return total
}