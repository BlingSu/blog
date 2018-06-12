/*
 * @author: angelasu
 * @date: 2018/03/11
 * @description:单例模式
 */


 // 只允许实例化一次的对象


function getId(id) {
  return document.getElementById(id)
}

function setCss(id, key, value) {
  g(id).style[key] = value
}

function attr(id, key, value) {
  g(id)[key] = value
}

function html(id, value) {
  g(id).innerHTML = value
}

function on(id, type, fn) {
  g(id)['on' + type] = fn
}

/**
 * 命名空间的方法
 */
var angelasu = {
  g (id) {
    return document.getElementById(id)
  },
  css (id, key, value) {
    this.g(id).style[key] = value
  }
  // ...
}


/**
 * 静态变量
 */

var C = (function(){
  // 私有变量
  var conf = {
    MAX_NUM: 100,
    MIN_NUM: 1,
    COUNT: 1000
  }
  // 返回取值器对象
  return {
    // 取值器方法
    get (name) {
      return conf[name] ? conf[name] : null
    }
  }
})()

var count = C.get('MIN_NUM')
console.log(count)


/**
 * 延迟创建的单例模式
 */

var LazySingle = (function(){
  // 单例实例引用
  var _instance = null

  // 单例
  function Single() {
    /*定义私有属性和方法*/
    return {
      publicMethod () {},
      publicProperty: '1.0'
    }
  }
  // 获取单例对象接口
  return function() {
    if (!_instance) {
      _instance = Single()
    }
    return _instance
  }
})()

console.log(LazySingle().publicProperty)
