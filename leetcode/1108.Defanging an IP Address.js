/**
 * @author angelasubi
 * @date 2019-07-11
 */

/**
 * @param {string} address
 * @return {string}
 */
const defangIPaddr = function(address) {
  return address.replace(/\./g, '[.]')
}