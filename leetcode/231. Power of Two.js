/**
 * @author: angelasubi
 * @date 2019-06-05
 */

/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfTwo = function(n) {
	//2进制中有且仅有一个1,可以通过移位来数1的个数
   return n > 0 && ((n & (n - 1)) === 0)
}