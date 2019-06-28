/**
 * @author angelasubi
 * @date 2019-06-27
 */


/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function(s, p) {
  let reg = new RegExp('^' + p + '$')
  return reg.test(s)
}