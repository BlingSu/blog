/**
 * @author: angelasubi
 * @date: 2018-12-27
 */


/**
 * @param {string} str
 * @return {number}
 */
const myAtoi = function(str) {
  let value = parseInt(str)

  if (value > 2147483647) {

    return 2147483647

  } else if (value < -2147483647) {

    return -2147483648

  } else if (isNaN(value)) {

    return 0
  }
  return value
}
