/**
 * @question:
 * There are two sorted arrays nums1 and nums2 of size m and n respectively.
 * Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
 * You may assume nums1 and nums2 cannot be both empty.
 *
 * @example:
 *
 * Example 1:
 * nums1 = [1, 3]
 * nums2 = [2]
 * The median is 2.0
 *
 * Example 2:
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 * The median is (2 + 3)/2 = 2.5
 */


const findMedianSortedArrays = function(nums1, nums2) {
  const sum = nums1.concat(nums2)

  sum.sort((a, b) => {
    return a - b
  })

  const len = sum.length

  if (len && len % 2 !== 0) return sum[~~(len / 2)]
    else
      return (sum[len / 2 - 1] + sum[len / 2]) / 2
}

