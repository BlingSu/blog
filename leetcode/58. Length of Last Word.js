/**
 * @author: angelasubi
 * @date: 2018-04-28
 */


/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  let arr = s.trim().split(' ')
  return arr[arr.length - 1].length
}