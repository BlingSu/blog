/*
 * @author: angelasu
 * @date: 2018/12/10
 * @description: 链模式。通过在对象方法中将当前对象返回，实现对同一个对象多个方法的链式调用。
 */

 // jQuery中

var A = function(selector) {
  return A.fn.init(selector)
}
A.fn = A.prototype = {
  init: function(selector) {
    return document.getElementById(selector)
  },
  length: 2,
  size: function() {
    return this.length
  }
}
console.log(A('test')) // <div id="test"></div>

// 如果要让A对象的返回结果拥有A.fn的方法，可以让对象中的this指向当前的对象，而在init方法中的当前对象就是A.fn，所以直接在init中将this返回即可。
var A = function(selector) {
  return A.fn.init(selector)
}
A.fn = A.prototype = {
  init: function(selector) {
    this[0] = document.getElementById(selector)
    this.length = 1
    return this
  },
  length: 2,
  size: function() {
    return this.length
  }
}
var test = A('test')
console.log(test) // Object {0: div#test, init: function, length: 1,size: function}

var A = function(selecotr) {
  return new A.fn.init(selecotr)
}
console.log(A('test').size()) // Uncaught TypeError

// A.fn.init(selector)，init返回的this是指向的当前对象，也就是A.fn和A.prototype， 而new A.fn.init(selecotr)中，由于进行了new对对象内的属性复制，所以this指向的就不是A.fn和A.prototype了。

/**
 * 将构造函数的原型指向一个已存在的对象即可
 * A.fn.init.prototype = A.fn
 * 
 * 实例化的对象是在构造函数执行时创建的，所以constructor指向的就是A.fn.A.init构造函数，但是这个对象执行完毕竟就不存在了。所以强化constructor可以让__proto__指向A对象
 */
var A = function(selecotr) {
  return new A.fn.init(selecotr)
}
A.fn = A.prototype = {
  constructor: A,
  init: function(selecotr) {
    console.log(this.constructor)
    /**
     * 输出结果
     * function(selector) {
     *  return new A.fn.init(selector)
     * }
     */
  }
}
A.fn.init.prototype = A.fn

/**
 * 丰富元素获取
 * selector 选择器
 * context 上下文
 */

var A = function(selecotr, context) {
  return new A.fn.init(selecotr, context)
}
A.fn = A.prototype = {
  constructor: A,
  init: function(selecotr, context) {
    // 获取元素长度
    this.length = 0
    // 默认获取元素的上下文 document
    context = context || document
    // 如果是id选择符 按位非将-1转化为0
    if (~selecotr.indexOf('#')) {
      // 截取id并选择
      this[0] = document.getElementById(selecotr.slice[1])
      this.length = 1
    } else {
      // 在上下文中选择元素
      var doms = document.getElementsByTagName(selecotr),
          i = 0,
          len = doms.length
        for (; i < len; i++) {
          // 放入this中
          this[i] = doms[i]
        }
        // 矫正长度
        this.length = len
    }
    // 保存上下文
    this.context = context
    // 保存选择符
    this.selecotr = selecotr
    // 返回对象
    return this
  },
  // ...
}

/**
 * 数组与对象
 * 判断是否有length属性
 * 判断是否具有数组方法
 */

 A.fn = A.prototype = {
   // 增强数组
   push: [].push,
   sort: [].sort,
   splice: [].slice
 }

 /**
  * 方法拓展
  * des: 如果只有一个参数我们就定义为A对象或者A.fn对象的拓展，对A.fn对象的拓展是因为我们使用A()返回对象中的方法是从A.fn对象上获取的。多个参数标示对第一个对象的拓展。
  */

  A.extend = A.fn.extend = () => {
    // 拓展对象从第二个参数算起
    let i = 1,
        // 获取参数长度
        len = arguments.length,
        // 第一个参数为源对象
        target = arguments[0]
        // 拓展对象中的属性
        j;
    
    // 如果只传一个参数
    if (i == len) {
      // 源对象为当前对象
      target = this
      // i 从 0 计数
      i--
    }

    // 遍历参数中拓展对象
    for (; i < len; i++) {
      // 遍历拓展对象中的属性
      for (j in arguments[i]) {
        // 拓展源对象
        target[j] = arguments[i][j]
      }
    }
    // 返回源对象
    return target
  }
  var demo = A.extend(
    {first: 1},
    {second: 2},
    {third: 3}
  )
  console.log(demo)
  A.extend(A.fn, { version: '1' }) // 1
  A.fn.extend({getVersion: function() { return this.version }}) 
  console.log(A('demo').getVersion()) // 1
  A.extend(A, {age: '22'}) 
  console.log(A.age) // 22


  /**
   * 添加方法
   * des: 已经向A.fn对象中添加的方法间接添加到A.fn.init原型对象上。
   * 绑定事件 on
   * 设置css样式
   * 设置元素属性方法
   * 设置元素内容方法
   */

   A.fn.extend({
     on: (function() {
       if (document.addEventListener) {
         return (type, fn) => {
           var i = this.length - 1
           for (; i >= 0; i--) {
             this[i].addEventListener(type, fn, false)
           }
           return this
         }
       } else if (document.attachEvent) {
         return (type, fn) => {
           var i = this.length - 1
           for (; i >= 0; i--) {
             this[i].addEvent(`on${type}`, fn)
           }
           return this
         }
       } else {
         return (type, fn) => {
           var i = this.length - 1
           for (; i >= 0; i--) {
             this[i][`on${type}`] = fn
           }
           return this
         }
       }
     })()
   })

   A.extend({
     // - 去掉 转驼峰
     camelCase: function(str) {
       return str.replace(/\-(\w)/g, (all, letter) => {
         return latter.toUpperCase()
       })
     }
   })

  A.extend({
    css: function() {
      let arg = arguments, len = arg.length

      if (this.length < 1) {
        return this
      }
      // 1个次桉树
      if (len === 1) {
        // 字符串获取第一个元素的css
        if (typeof arg[0] === 'string') {
          if (this[0].currentStyle) {
            return this[0].currentStyle[name]
          } else {
            return getComputedStyle(this[0], false)[name]
          }
        }
        // 对象则设置多个样式
      } else if (typeof arg[0] === 'object') {
        for (let i in arg[0]) {
          for (j = this.length - 1; j >= 0; j--) {
            this[j].style[A.camelCase[i]] = arg[0][i]
          }
        }
        // 两个参数则设置一个样式
      } else if (len == 2) {
        for (let j = this.length - 1; j >= 0; j--) {
          this[j].style[A.camelCase(arg[0])] = arg[i]
        }
      }
      return this
    }
  })
   

  A.fn.extend({
    attr: function() {
      let arg = arguments, len = arg.length
      if (this.length < 1) {
        return this
      }

      // 一个参数
      if (len === 1) {
        // 若为字符串则获取第一个元素属性
        if (typeof arg[0] === 'string') {
          return this[0].getAttribute(arg[0])
          // 为对象设置每个元素的多个属性
        } else if (typeof arg[0] === 'object') {
          for (let i in arg[0]) {
            for (var j = this.length -1; j >= 0; j--) {
              this[j].setAttribute(o, arg[0][i])
            }
          }
        }
        // 两个参数则设置每个元素单个属性
      } else if (len === 2) {
        for (var j = this.length - 1; j >= 0; j--) {
          this[j].setAttribute(arg[0], arg[1])
        }
      }
      return this
    }
  })

  A.fn.extend({
    html: function() {
      let arg = arguments, len = arguments.length

      if (len === 0) {
        return this[0] && this[0].innerHTML
      } else {
        for (let i = this.length; i >= 0; i--) {
          this[i].innerHTML = arg[0]
        }
      }
      return this
    }
  })


  /**
   * use
   */

   A('div')
   .css({
     height: '30px',
     border: '1px solid #333',
     'background-color': '#000'
   })
   .attr('class', 'fuck')
   .html('add html test')
   .on('click', () => {
     alert(`onlick.....~~~`)
   })