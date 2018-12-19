/**
 * @question:
 * Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
 *
 * @example:
 *
 * Example 1:
 * Input: "babad"
 * Output: "bab"
 * Note: "aba" is also a valid answer.
 *
 * Example 2:
 * Input: "cbbd"
 * Output: "bb"
 */


/**
 * @param {string} s
 * @return {string}
 */

const longestPalindrome = function(s) {
  let max = -1, res = '', count, i, j
  for (let index = 0; index < s.length; index++) {
    if (s[index -1] && s[index] === s[index-1]) continue
    count = 1
    i = j = index

    while(s[j + 1] && s[j + 1] === s[index]) {
      j++, count++
    }
    while(s[i] && s[j] && s[i] === s[j]) {
      count += 2
      i--, j++
    }
    if (count > max) {
      max = count
      res = s.substring(i + 1, j)
    }
  }
  return res
}
