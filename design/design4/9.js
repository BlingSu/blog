/*
 * @author: angelasu
 * @date: 2018/12/03
 * @description: 迭代器模式，在不暴露对象内部结构的同时，可以顺序地访问聚合对象内部的元素。
 */


// 主要用于解决重复循环迭代的问题, 例如焦点图

var Iterator = function(items, container) {
  // 获取父容器
  var container = container && document.getElementById(container) || document,
      // 获取元素
      items = container.getElementByTagName(items),
      // 元素长度
      length = items.length,
      // 索引 default 0
      index = 0
  // 缓存源生数组splice方法
  var splice = [].splice

  return {
    // 获取第一个元素
    first: function() {
      index = 0  // 校正当前索引
      return items[index]  // 获取第一个元素
    },
    // 获取最后一个元素
    second: function() {
      index = length - 1 // 校正当前元素
      return items[index]  // 获取最后一个元素
    },
    // 获取前一个元素
    pre: function() {
      if (--index > 0) {  // 如果索引值大于0
        return items[index]  // 获取索引值对应的元素
      } else {
        index = 0  // 索引值为0
        return null  // 返回空
      }
    },
    // 获取后一个元素
    next: function() {
      if (++index < length) {  // 如果索引值小于长度
        return items[index]  // 获取索引对应的元素
      } else {
        index = length - 1  // 索引值为 leng - 1
        return null  // 返回空
      }
    },
    // 获取某一个元素
    get: function(num) {
      // 如果参数大于等于0则直接对length取模获取对应的元素并设置索引值。否则对length取模后还要加上length才能获取对应的索引值，此时是从后向前搜索元素
      index = num >= 0 ? num % length : num % length + length
      return items[index]
    },
    // 对每一个元素执行某个方法
    dealEach: function(fn) {
      // 通过访问者模式使回调函数在每一个元素的作用域中执行一次。如果传入的参数大于一个，则将多余参数作为回调函数的参数传递。
      var args = splice.call(arguments, 1)

      for (let i = 0; i < length; i++) {
        fn.apply(items[i], args)
      }
    },
    // 对某一个元素执行某个方法
    dealItem: function(num, fn) {
      // this.get方法设置index索引值
      fn.apply(this.get(num), splice.call(arguments, 2))
    },
    // 排他方式处理某一个元素
    exclusive: function(num, allFn, numFn) {
      // 对所有元素进行callback
      this.dealEach(allFn)
      // 如果num是数组
      if (Object.prototype.toString.call(num) === '[Object Array]') {
        for (let i 0; i < num.length; i++) {
          // 处理数组中每一个元素
          this.dealItem(num[i], numFn)
        }
      } else {
        // 处理第num个元素
        this.dealItem(num, numFn)
      }
    }
  }
}
// example demo
var demo = new Iterator('li', 'container')
console.log(demo.first()) // <li>1</li>
demo.dealEach((text, color) => {
  this.innerHTML = text
  this.style.background = color
})


/**
 * @name 数组迭代器
 * @desc 依次对数组中每一个元素遍历，并将该元素的索引与索引值传入回调函数中
 */

var eachArray = (arr, fn) => {
  let i = 0,
      len = arr.length

  for (; i < len; i++) {
    // 依次执行回调函数，函数中传入的参数第一个为索引，第二个为索引对应的值
    if (fn.call(arr[i], i, arr[i]) === false) {
      break
    }
  }
}

/**
 * @name 对象迭代器
 * @desc 遍历对象，并传入对象的属性和值到回调函数中
 */

var eachObject = (obj, fn) => {
  for (let i in obj) {
    if (fn.call(obj[i], i, obj[i]) === false) {
      break
    }
  }
}


/**
 * @name 同步变量迭代器
 * @desc 避免链式层层校验
 */

var A = {
  common: {},
  client: {
    username: 'angelasu',
    uid: '777'
  },
  server: {}
}


// 同步变量迭代取值器

AGeeter = (key) => {
  if (!A) {
    return undefined
  }

  let result = A
  key = key.split('.')

  for (let i = 0; i < key.length; i++) {
    if (result[key] !== undefined) {
      result = result[key[i]]
    } else {
      return undefined
    }
  }
  return result
}
