/*
 * @author: angelasu
 * @date: 2018/11/09
 * @description: 访问者模式，针对对象结构中的元素，定义在不改变对象的前提下访问结构中元素的新方法
 */


// 设置样式(ie 报错)
var bindEvent = function(dom, type, fn) {
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    dom.attachEvent(`on${type}`, fn)
  } else {
    dom[`on${type}`] = fn
  }
}

var demo = document.getElementById('demo')
bindEvent(demo, 'click', function() {
  this.style.background = 'red'
})

/** call和apply更改函数执行时的作用域 */
function bindIEEvent(dom, type, fn, data) {
  var data = data || {}
  dom.attachEvent(`on${type}`, fn, function(e) {
    fn.call(dom, e, data)
    // data主要是在call方法中携带事件对象（比如e）
  })
}


/**. 通过原生构造器创建对象访问器 */

var Visitor = (function() {
  return {
    // 截取方法
    splice: function() {
      // splice方法参数，从原参数的第二个参数开始算
      var args = Array.prototype.splice.call(arguments, 1)
      return Array.prototype.splice.apply(arguments[0], args)
    },

    // 添加数据方法
    push: function() {
      // 强化类数组对象，让他拥有length属性
      var len = arguments[0].length || 0
      // 添加的数据 从原参数的第二个参数算
      var args = this.splice(arguments, 1)
      // 校正 length 属性
      arguments[0].length = len + arguments.length
      // 对第一个参数对象执行push
      return Array.prototype.push.apply(arguments[0], args)
    },

    // 去掉最后一次添加的元素
    pop: function() {
      // 对第一个参数对象执行pop方法
      return Array.prototype.pop.apply(arguments[0])
    }
  }
})

/**
 * 创建一个对象，他是没有length的，通过push pop可以更像一个数组。
 */

var a = new Object()
console.log(a.length)  //  undefined
Visitor.push(a, 1, 2, 3, 4)
console.log(a.length). // 4
