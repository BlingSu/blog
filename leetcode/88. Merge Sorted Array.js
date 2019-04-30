/**
 * @author: angelasubi
 * @date 2019-04-29
 */

 /**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  if (m == 0 && n == 0) return
  if (m == 0 && n != 0) {
    for (let i = 0; i < n; i ++) {
      nums1[i] = nums2[i]
    }
  }

  if (m != 0 && n != 0) {
    let i = m - 1,
        j = n - 1,
        p = m + n - 1  // 最后一个索引
    
    while ( j >= 0 && i >= 0) {
      if (nums1[i] > nums2[j]) {
        nums1[p] = nums1[i]
        i--
      } else {
        nums1[p] = nums2[j]
        j--
      }
      p--
    }
    while (i >= 0) {
      nums1[p] = nums1[i]
      i--
      p--
    }
    while (j >= 0) {
      nums1[p] = nums2[j]
      j--
      p--
    }
  }
  return nums1
}