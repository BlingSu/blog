/**
 * @author: angelasubi
 * @date 2019-04-012
 */

/**
 * @param {string} s
 * @return {number}
 */

let map = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
}

var romanToInt = function (s) {
  let max = 0
  let res = 0
  for (let i = s.length - 1; i >= 0; i--) {
    let cur = s[i]
    let val = map[cur]
    res += val >= max ? val : -val
    max = Math.max(max, val)
  }
  return res
}