/*
 * @author: angelasu
 * @date: 2018/03/08
 * @description: 工厂方法模式
 */

// 通过创建类，然后实例对象方式

var Java = function(content) {
  // 将内容保存在content里面
  this.content = content
  // 创建对象时，通过闭包，直接执行，将内容按需求插入
  (function(content) {
    var div = document.createElement('div')
    div.innerHTML = content
    div.style.color = 'green'
    document.getElementById('container').appendChild(div)
  })(content)
}

var PHP = function(content) {
  // 将内容保存在content里面
  this.content = content
  // 创建对象时，通过闭包，直接执行，将内容按需求插入
  (function(content) {
    var div = document.createElement('div')
    div.innerHTML = content
    div.style.color = 'yellow'
    div.style.background = 'red'
    document.getElementById('container').appendChild(div)
  })(content)
}

// 语言工厂～
function LanguageFactory(type, content) {
  switch(type) {
    case 'java':
      return new Java(content)
    case 'php':
      return new PHP(content)
  }
}

LanguageFactory('php', 'Java or PHP ?')


/**
 * 将工厂方法看作是一个实例对象的工厂类
 * 采用安全模式类
 * 将创建对象的基类放在工厂方法类的原型中
 */

// 安全模式类: 在构造函数开始的时候判读当前对象this指向是不是类，如果是通过new创建对象，不是的话那可能在全局志向window，就要重新返回新创建对象了。

var Demo = function() {
  if (!(this instanceof Demo)) {
    return new Demo()
  }
}
Demo.prototype = {
  show () {
    console.log('ok')
  }
}
var d = new Demo()
var dd = Demo()

console.log(d.show())
console.log(dd.show())


/**
 * 安全的工厂方法
 */

var Factory = function(type, content) {
  if (this instanceof Factory) {
    var s = new this[type](content)
    return s
  } else {
    return new Factory(type, content)
  }
}

// 工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
  Java: function(content) {
    // ...
  },
  JavaScript: function(content) {
    // ...
  },
  UI: function(content) {
    this.content = content
    (function(content) {
      // body...
    })(content)
  },
  PHP: function(content) {
    // ...
  }
}

Factory('Java', 'java book')
