# ES5 常用Array方法整理

## 正言
1. forEach
2. map
3. filter
4. some 
5. every 
6. reduce
7. reduceRight
8. indexOf
9. lastIndexOf 
10. find (es6新增)
11. findIndex (es6新增)

### forEach
forEach 是Array中基本的一个遍历方法。

```js
const arr = [1,2,3]
arr.forEach((item, index, array) => {
    console.log(item, index, array)
})

// output
1 0 [1,2,3]
2 1 [1,2,3]
3 2 [1,2,3]
```

forEach 方法中到callback有三个参数:
* 数组当前项
* 对应数组到索引
* 数组本身

forEach 接受一个必须到回调函数参数，还可以接受一个可选到上下文参数(改变回调函数里面到this指向)。如果没传入第二参数，则指向window，严格模式为undefined

比如:
```js
const arr = [1,2,3]
const obj = {name: angela}

arr.forEach((item, index, array) => {
    console.log(item, index, array, this)
}, obj)

//output
1 0 [1, 2, 3] {name: 'angela'}
2 1 [1, 2, 3] {name: 'angela'}
3 2 [1, 2, 3] {name: 'angela'}
```

对IE6-IE8低版本进行仿真扩展:
```js
if (typeof Array.prototype.forEach != 'function') {
    Array.prototype.forEach = function(fn, context) {
        for (let k = 0, length = this.length; k < length; k++) {
            if (typeof fn === 'function' && Object.prototype.hasOwnProperty.call(this, k)) {
                fn.call(context, this[k], k, this)
            }
        }
    }
}
```

### map
map方法是将原来对数组按照一定对规则映射出一个新的数组再返回。

```js
// callback参数
[].map((value, index, array) => {
    // ...
})
```

数值求平方例子:

```js
const data = [1,2,3]
const array = data.map(item => {
    return item * item
})
console.log(array)

//output
[1, 4, 9]
```

如果callback没有return 则会输出undefiend

```js
const data = [1,2,3]
const array = data.map(item => {
    item * item
})
console.log(array)

//output
[undefiend, undefiend, undefiend]
```

对IE6-IE8低版本进行仿真扩展:
```js
if (typeof Array.prototype.map != 'function') {
    Array.prototype.map = function(fn, context) {
        let arr = []
        if (typeof fn === 'function') {
            for (let k = 0, length = this.length; k < lenght; k++) {
                arr.push(fn.call(context, this.[k], k, this))
            }
        }
        return arr
    }
}

```


#### filter
filter 相当于过滤后返回新的数组。(true则通过，false不通过)

```js
const arr = [1, 2, 3]

let arr1 = arr.filter((item, index, array) => {
    return item
})

//output
[1, 2, 3]


let arr2 = arr.filter((item, index, array) => {
    return item>=2
})

//output
[2, 3]
```

对IE6-IE8低版本进行仿真扩展:

```js
if (typeof Array.prototype.filter != 'function') {
    Array.prototype.filter = function(fn, context) {
        let arr = []
        if (typeof fn === 'function') {
            for (let k = 0, length = this.length; k < length; k++) {
                fn.call(context, this[k], k, this) && arr.push(this[k])
            }
        }
        return arr
    }
}
```

#### some
some方法只要数组中的某个值，符合就true，反之false。

```js
function big(item, index, array) {
    return item >= 4
}

const count = [1, 2, 3]
const count2 = [1, 2, 3, 4]
count.some(big)  // output false
count2.some(big)  // output true
```

对IE6-IE8低版本进行仿真扩展:

```js
if (typeof Array.prototype.some != 'function') {
    Array.prototype.some = function(fn, context) {
        let passed = false
        if (typeof fn === 'function') {
            for (let k = 0, length = this.length; k < length; k++) {
                if (passed === true) break
                passed = !!fn.call(context, this[k], k, this)
            }
        }
        return passed
    }
}
```

#### every
every和some类似,但是是所有的值都符合才true，否则为false


```js
function big(item, index, array) {
    return item >= 3
}

const count = [2, 3, 4].every(big)  // output false
const count2 = [3, 4, 5].every(big) // output true
```

对IE6-IE8低版本进行仿真扩展:

```js
if (typeof Array.prototype.every != 'function') {
    Array.prototype.every = function(fn, context) {
        let pased = true
        if (typeof fn === 'function') {
            for (let k = 0, length = this.length; k < length; k++) {
                if (passed === true) break
                passed = !!fn.call(context, this[k], k, this)
            }
        }
        return passed
    }
}
```


#### reduce
reduce 中文有 '减少'， '约减'的意思

```js
array.reduce(callback[, initialValue])
```

callback函数接受4个参数 (initialValue 参数可选 标示初始值)
* 之前值 previous
* 当前值 current
* 索引值 index
* 数组本身 array

```js
const sum = [1, 2, 3, 4].reduce((previous, current, index, array) => {
    return previous + current
})
console.log(sum)

// output
// 10
```

解析:
1. initialValue不存在，所以pervious等于数组的第一个元素
2. current 在第一次调用的时候就是2

```js
// 初始设置
previous = initialValue = 1, current = 2

// 第一次迭代
previous = (1 + 2) = 3, current = 3

// 第二次迭代
previous = (3 + 3) = 6, current = 4

// 第三次迭代
previous = (6 + 4) = 10, current = undefiend (退出)
```

例子: 数组扁平化～

```js
const matrix = [[1,2],[3,4],[5,6]]

const flatten = matrix.reduce((pre, cur) => {
    return pre.concat(cur)
})

console.log(flatten)

// output
// [1,2,3,4,5,6]
```

对IE6-IE8低版本进行仿真扩展:

```js
if (typeof Array.prototype.reduce != 'function') {
    Array.prototype.reduce = function(callback, initialValue) {
        let previous = initialValue, k = 0, length = this.length
        if (typeof initialValue === 'undefiend') {
            previous = this[0]
            k = 1
        }
        if (typeof callback === 'function') {
            for (k; k< length; k++) {
                this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this))
            }
        }
        return previous
    }
}
```

#### reduceRight
reduceRight 跟 reduce 类似， 只是reduceRight 是从数组的末尾开始实现的。

#### indexOf
indexOf说白了就是找那个元素在不在数组里面，第几个是不是它

```js
array.indexOf(searchElement, fromIndex)
```

返回整数索引值，如果没有(严格匹配)，返回-1, fromIndex参数可选，如果没有或者格式不对,使用默认值0

例子:

```js
const data = [2, 5, 7, 3, 5]

console.log(data.indexOf(1))
// -1

console.log(data.indexOf(2))
// 0

console.log(data.indexOf(5))
// 1

console.log(data.indexOf(5, 2))
// 4
```

对IE6-IE8低版本进行仿真扩展:

```js
if (typeof Array.prototype.indexOf != 'function') {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        let index = -1
        fromIndex = fromIndex * 1 || 0

        for (let k = 0, length = this.length; k < length; k++) {
            if (k >= fromIndex && this[k] === searchElement) {
                index = k
                break
            }
        }
        return index
    }
}
```

#### lastIndexOf
lastIndexOf 方法与 indexOf 方法类似。只是从末尾开始查找，且fromIndex默认值为-1

```js
array.lastIndexOf(searchElement, fromIndex)
```

#### find / findIndex

find 方法把所有的数组成员执行回调函数，直到找到一个为true的时候返回该成员。否则返回undefiend

```js
const value = [1, 5, 10 ,15].find((el, index, array) => {
    return el > 9
})

console.log(value) // 10

const value2 = [1, 5, 10 ,15].find((el, index, array) => {
    return el > 20
})

console.log(value2) // undefiend
```


findIndex 与find是类似的，只不过它返回的是索引，如果都不符合，那么返回-1

```js
const value = [1, 5, 10 ,15].findIndex((el, index, array) => {
    return el > 9
})

console.log(value) // 2

const value2 = [1, 5, 10 ,15].find((el, index, array) => {
    return el > 20
})

console.log(value2) // -1
```

对不支持 find/findIndex 的浏览器进行仿真扩展:

```js
Array.prototype.find = Array.prototype.find || function(fn, context) {
    if (typeof fn === 'function') {
        for (let k = 0, length = this.length; k < length; k++) {
            if (fn.call(context, this[k], k, this)) {
                return this[k]
            }
        }
    }
    return undefiend
}


Array.prototype.findIndex = Array.prototype.findIndex || function(fn, context) {
    if (typeof fn === 'function') {
        for (let k = 0, length = this.length; k < length; k++) {
            if (fn.call(context, this[k], k, this)) {
                return k
            }
        }
    }
    return -1
}
```

