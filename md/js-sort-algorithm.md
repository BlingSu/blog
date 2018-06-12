# javascript排序算法

1. 冒泡排序
> 比较相邻的元素，然后大的跟后面的继续比,最后一个除外

```js
function bubbleSort(arr) {
    // 获取 arr 的长度
    let len = arr.length
    // 遍历数组，小于长度减1(最后一个不用继续)
    for (let i = 0; i < len - 1; i++) {
        // 遍历数组，当前元素的那个相邻元素
        for (let j = 0; j < len - 1 - i; j++) {
            // 相邻两个元素对比 交换位置
            if (arr[j] > arr[j+1]) {
                // 若成立，定义一个新的temp小的
                let temp = arr[j+1]
                // 把前面的元素放到后面去
                arr[j+1] = arr[j]
                // 把小的放到前面去
                arr[j] = temp
            }
        }
    }
    return arr
}
```

2. 选择排序
> 先在没排序的里面找出最小(大)的放在头部，剩下没排序的最小(大)放在尾部

```js
function selectionSort(arr) {
    // 定义arr的长度
    let len = arr.length
    // 定义两个变量
    let minIndex, temp
    // 遍历 arr这个数组 len-1 是因为最后两个元素交换位置的时候整个数组就排序好了
    for (let i = 0; i < len - 1; i++) {
        // 当前到的第几个元素的索引给minIndex
        minIndex = i
        // 排除自己
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                // 交换
                minIndex = j
            }
        }
        // 定义一个temp用来暂时存放
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    return arr
}
```

3. 插入排序
> 构建有序序列，对于没有排序的则从后面向前面扫描找到相应的位置并插入

```js
function insertionSort(arr) {
    // 定义len为数组的长度
    let len = arr.length
    let preIndex, current
    // 遍历数组 第一个不用
    for (let i = 1; i < len; i++) {
        // 当前这个元素前面元素的索引
        preIndex = i - 1
        // 当前这个元素
        current = arr[i]
        // 当前项大于等于1 并且 前一元素大于当前元素
        while (preIndex >= 0 && arr[preIndex] > current) {
            // 前一元素的值放到当前这里
            arr[preIndex+1] = arr[preIndex]
            preIndex--
        }
        // 当前这个移到后面一个位置
        arr[preIndex+1] = current
    }
    return arr
}
```

4. 希尔排序
> 将整个没排序记录序列分割成多个，在序列内排序，等整个序列基本有序时，进行插入排序

```js
function shellSort(arr) {
    let len = arr.length, temp, cut = 1
    // 动态定义间隔序列
    while (cut < len / 3) {
        cut = cut * 3 + 1
    }
    // 向下取整
    for (cut; cut > 0; cut = Math.floor(cut/3)) {
        // 插入排序
        for (let i = cut; i < len; i++) {
            temp = arr[i]
            for (let j = i - cut; j >= 0 && arr[j] > temp; j-=cut) {
                arr[j+cut] = arr[j]
            }
            arr[j+cut] = temp
        }
    }
    return arr
}

/* 方法2 */
function shellSort(arr) {
    let len = arr.length
    let cut = len
    do {
        cut = Math.floor(cut/3) + 1  //减少增量 
        // 将距离为cut的元素编为一个组，遍历整个组
        for (let i = cut; i < len; i++) {
            let temp = array[i]
            j = i - cut
            while (j >= 0 && temp < arr[j]) {
                arr[j+cut] = arr[j]
                j-= cut
            }
            arr[j+jap] = temp
        }
    } while (cut > 1)
    return arr
}

/* 方法三 */
function shellSort(nums) {
    let gaps = [5, 3, 1] // 定义间隔区间
    for (let g = 0; g < gaps.length; g++) { // 一个一个间隔值开始
        for (let i = gaps[g]; i < nums.length; i++) { // 以间隔值遍历
            let temp = nums[i] // 选中元素
            // 前面大于后面
            for (let j = i; j >= gaps[g] && nums[j-gaps[g]] > temp; j-=gaps[g]) {
                nums[j] = nums[j-gaps[g]] // 后移
            }
            nums[j] = temp // 填补
        }
    }
}
```

5. 归并排序
> 将数组氛围若干子数组变成有序数组，在合并

```js
function mergeSort(arr) {   // 从上而下的递归
    let len = arr.length
    // 长度小于2返回原数组
    if (len < 2) {
        return arr
    }
    // 获取中间数 分为左右两边
    let middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle)
        // 递归
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    let result = []
    // 同时存在长度时候
    while (left.length && right.length) {
        // 哪边小 就把小的插到result里
        if (left[0] <= right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    // 存在长度差到数组里
    while (left.length) 
        result.push(left.shift())
    while (right.length)
        result.push(right.shift())
    return result
}
```

6. 快速排序
> 通过递归将数组拆成大小两边，直到有序为止，期间选一个基准分放在两边

```js
function quickSort(arr) {
    // 如果小于等于1 返回原数组
    if (arr.length <= 1)  return arr
    // 选择基准，分离原数组，定义两个空数组，分别存两个子集
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr.splice(pivotIndex, 1)[0]
    let left = [], right = []
    //遍历数组，小于基准放左边，大于放右边
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    // 递归调用，连接左右和基准
    return quickSort(left).concat([pivot], quickSort(right))
}
```

7. 堆排序
> 把最大堆堆顶的最大数取出，剩下继续调整为最大，再拿出最大，直到剩下一个结束
```
最大堆:
最大堆中的最大元素值出现在根节点（堆顶）
堆中每个父节点的元素值都大于等于其孩子节点（如果存在）

最小堆：
最小堆中的最小元素值出现在根结点（堆顶）
堆中每个父节点的元素值都小于等于其孩子结点（如果存在）

数组起始为0的时候:
父节点i的左子节点在位置(2*i+1)
父节点i的右子节点在位置(2*i+2)
子节点i的父节点在位置floor((i-1)/2)
```

* 最大堆调整: 将堆的末端子节点作调整，使得子节点永远小于父节点
* 创建最大堆: 将堆所有数据重新排序，使其成为最大堆
* 堆排序: 移除位在第一个数据的根节点，并做最大堆调整的递归运算

```js
function swap(arr, a, b) {
    // 交换位置
    if (a == b) return
    let c = arr[a]
    arr[a] = arr[b]
    arr[b] = c
}
function heapSort(newArr) {
    let len = newArr.length
    if (len <= 1) {
        return newArr
    } else {
        for (let i = Math.floor(len / 2); i >= 0; i--) {
            maxHeapify(newArr, i, n)
        }
        // 堆排序
        for (let j = 0; j < n; j++) {
            swap(newArr, 0, n - 1 - j)
            maxHeapify(newArr, 0, n - 2 -j)
        }
        return newArr
    }
}
function maxHeapify(Arr, i, size) {
    let l = 2 * i + 1, r = 2 * i + 2
    let largest = i
    if (l <= size && Arr[l] > Arr[largest]) {
        largest = l
    }
    if (r <= size && Arr[r] > Arr[largest]) {
        largest = r
    }
    if (largest !== i) {
        swap(Arr, i, largest)
        maxHeapify(Arr, largest, size)
    }
}
```

8. 计数排序
> 确定范围的整数的线性时间排序算法

```js
function countingSort(arr) {
    let len = arr.length,
        result = [],
        count = [],
        min = max  = arr[0]
        // 查找最大值和最小值，放到count里，统计出现的次数
        for (let i = 0; i < len.length; i++) {
            count[arr[i]] = count[arr[i]] ? count[arr[i]] + 1 : 1
            min = min <= arr[i] ? min : arr[i]
            max = max >= arr[i] ? max : arr[i]
        }
        // 从最小值到最大值，将计数逐项累加
        for (let j = min; j < max; j++) {
            count[j+1] = (count[j+1] || 0) + (count[j] || 0)
        }
        // count中，下标为的数值，数据为arr出现的次数，反向填充数据进入result数据
        for (let k = len - 1; k >= 0; k--) {
            // result[位置] = arr数据
            result[count[arr[k]] - 1] = arr[k]
            // 减少count数组中保存的计数
            count[arr[k]]--
        }
        return result
}
```

9. 桶排序
> 计数排序的升级版

```js
function bucketSort(arr, bucketSize) {
    if (arr.length === 0) {
        return arr
    }
    let i
    let minValue = arr[0]
    let maxValue = arr[0]
    for (i = 1; i < arr.length; i++) {
        if (arr[i] < minValue) {
            minValue = arr[i] // 输入数据的最小值
        } else if (arr[i] > maxValue) {
            maxValue = arr[i] // 输入数据的最大值
        }
    }

    // 桶的初始化
    let DEFAULT_BUCKET_SIZE = 5 //默认桶数量5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
    let buckets = new Array(bucketCount)
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = []
    } 
    // 利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i])
    }
    arr.length = 0
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i])  // 对每个桶进行插入排序
        for (let j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j])
        }
    }
    return arr
}
```

10. 基数排序
> 将整数按位数切割成不同的数字，然后按每个位数分别比较

```js
let counter = []
// 定义一个函数 arr待排序数组 maxDigit数组中最大的位数，exp: [1,10,100]的maxDigit = 3
function radixSort(arr, maxDigit) {
    let mod = 10
    let dev = 1
    for (let i = 0; i < maxDigit; i++, dev * 10, mod *= 10) {
        // 把待排序的数组 arr 中的每一个整数，插入对应的容器
        for (let j = 0; j < arr.length; j++) {
            // 从个位开始，得到数组中每个数的每一位并保存在bucket变量中
            // bucket 变量的值可能是 0到9
            // 与之对应的 counter[bucket] 容器为0到9
            let bucket = parseInt((arr[j] % mod) / dev)
            // bucket 变量的值对应的 counter[bucket] 容器不存在，则创建一个
            if (counter[bucket] == null) {
                counter[bucket] = []
            }
            // 将bucket 变量的值 插入对应的counter[bucket]容器的尾部
            counter[bucket].push(arr[j])
        }
        // 把 counter[bucket] 容器里的数依次取出
        let pos = 0
        for (let j = 0; j < counter.length; j++) {
            // 定义一个value 用于保存counter[j].shift
            let value = null
            if (counter[j] != null) {
                while ((value = counter[j].shift()) != null) {
                    arr[pos++] = value
                }
            }
        }
    } 
    return arr
}
```
