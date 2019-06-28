/**
 * @author angelasubi
 * @date 2019-06-27
 */

/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
const wordPattern = function(pattern, str) {
  let map = new Map(),
      words = str.split(' ')
  if (pattern.length !==  words.length) return false

  for (let i = 0; i < words.length; i++) {
      if (map.has(pattern[i])) {
          if (map.get(pattern[i]) !== words[i]) return false
      } else {
          let has = [...map.values()].some(v => v === words[i])
          if (has) {
              return false
          }
          map.set(pattern[i], words[i])
      }
  }
  return true
}