/**
 * @author: angelasubi
 * @date: 2019-06-24
 */

/**
 * @param {number} n
 * @return {number}
 */
const arrangeCoins = function(n) {
  let i = 1
  let k = 0
  while (n > 0) {
    n = n - i
    k++
    i++
  }
  if (n == 0) return k
    else return --k
};