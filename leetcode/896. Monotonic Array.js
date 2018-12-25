/**
 * @question:
 * An array is monotonic if it is either monotone increasing or monotone decreasing.
 * An array A is monotone increasing if for all i <= j, A[i] <= A[j].  An array A is monotone decreasing if for all i <= j, A[i] >= A[j].
 * Return true if and only if the given array A is monotonic.
 *
 * @exapmle:
 *
 * Example 1:
 * Input: [1,2,2,3]
 * Output: true
 *
 * Example 2:
 * Input: [6,5,4,4]
 * Output: true
 *
 * Example 3:
 * Input: [1,3,2]
 * Output: false
 *
 * Example 4:
 * Input: [1,2,4,5]
 * Output: true
 *
 * Example 5:
 * Input: [1,1,1]
 * Output: true
 *
 */

/**
 * @param {number[]} A
 * @return {boolean}
 */
var isMonotonic = function(A) {
  let dj = true
  let dz = true

  for (let i = 0; i < A.length; i++) {
    if (A[i] < A[i+1]) {
      dj = false
      break
    }
  }

  for (let j = 0; j < A.length; j++) {
    if (A[j] > A[j+1]) {
      dz = false
      break
    }
  }

  return dz || dj
}
