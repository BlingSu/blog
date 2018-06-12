# javascript基础算法学习
1. 判断一个单词是否是回文
> 会问是指把它位置颠倒过来和原来是一样的即是回文

```js
function checkPalindrom(str) {
    return str == str.split('').reverse().join('')
}
/**
checkPalindrom('eye')
=> true

checkPalindrom('eyes')
=> false
*/
```

2. 去掉整型数组重复的值

```js
比如输入:[1,1,2,3,11,11]
输出: [1,2,3,11]
```

```js
let unique = function(arr) {
    let hashTable = {}
    let data = []
    for (let i = 0; i < arr.length; i++) {
        if (!hashTable[arr[i]]) {
            hashTable[arr[i]] = true
            data.push(arr[i])
        }
    }
    return data
}
```

3. 统计字符串中出现最多的字母
> 比如一个连续的英文字母，找出重复最多的字母

```js
function findMaxReaptChar(str) {
    if (str.length == 1) {
        return str
    }
    let charObj = {}
    for (let i = 0; i < str.length; i++) {
        // charobj 里面放次数
        if (!charObj[str.charAt(i)]) {
            charObj[str.charAt(i)] = 1
        } else {
            charObj[str.charAt(i)] += 1
        }
    }
    let maxChar = '',
        maxValue = 1
        for (let k in charObj) {
            if (charObj[k] >= maxValue) {
                maxChar = k
                maxValue = charObj[k]
            }
        }
        return maxChar
}
```

4. 排序算法
> 多种方式 可以看上一章 [JavaScript基础算法(一)](https://github.com/angelasubi/study-todos/issues/1)

5. 不借助临时变量，进行两个整数交换
> 相当于 a = a + (b - a) 所以 a = b

```js
function swap(a, b) {
    b = b - a
    a = a + b
    b = a - b
    return [a, b]
}
```

6. 找出正数组里面最大差值
> 拿到最大值减去最小值得出结果

```js
function getMaxProfit(arr) {
    let minPrice = arr[0]
    let maxProfit = 0
    for (let i = 0; i < arr.length; i++) {
        let currentPrice = arr[i]
        // 每一个都跟第一个比 拿小
        minPrice = Math.min(minPrice, currentPrice)
        // 每一个减最小的
        let potentialProfit = currentPrice - minPrice
        //取大的
        maxProfit = Math.max(maxProfit, potentialProfit)
    }
    return maxProfit
}
/*
输入: [10,3,5,12,1]
输出: 11
 */
```

7. 随机生成制定长度字符串
> 比如要长度为6的字符串 9j5rnf

```js
function randomString(n) {
    let str = 'abcdefghijklmnopqrstuvwxyz9876543210'
    let tmp = '',
        i = 0,
        l = str.length
    for (i = 0; i < n; i++) {
        tmp += str.charAt(Math.floor(Math.random() * l))
    }
    return tmp
}
```

8. 阶乘
> 非递归实现

```js
function factorialize(num) {
    let result = 1
    if (num < 0) return -1
    if (num == 0 || num == 1) return 1
    while(num > 1) {
        result *= num--
    }
    return result
}
```
> 递归实现

```js
function factorialize(num) {
    let result = 1
    if (num < 0) return -1
    if (num == 0 || num == 1) return 1
    if (num > 1) return num * factorialize(name-1)
}
```
