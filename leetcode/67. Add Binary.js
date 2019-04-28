/**
 * @author: angelasubi
 * @date: 2018-04-28
 */


/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  let res = []
  let num = 0
  let add = 0
  while (a.length < b.length) {
    a = 0 + a
  }
  while (a.length > b.length) {
    b = 0 + b
  }

  for (let i = a.length - 1; i >=0; i--) {
    num = parseInt(a[i]) + parseInt(b[i]) + add
    if (num >= 2) {
      res[i] = num - 2
      add = 1
    } else {
      res[i] = num
      add = 0
    }
  }
  if (add > 0) {
    res.unshift(1)
  }
  return res.join('')
}