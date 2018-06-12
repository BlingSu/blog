/*
 * @author: angelasu
 * @date: 2018/03/11
 * @description: 适配器模式
 */


/*
 * 适配异类框架 如:JQuery
 */

var su = su || {}
// 通过 id 获取元素
su.g = function(id) {
  return document.getElementById(id)
}

// 绑定事件
su.on = function(id, type, fn) {
  // 字符串 id 处理 ，否则以元素处理
  var dom = typeof id === 'string' ? this.g(id) : id

  // dom2
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    // ie dom2
    dom.attachEvent('on' + type, fn)
  } else {
    dom['on' + type] = fn
  }
}

su.on(window, 'load', function() {
  su.on('button', 'click', function() {
    // ...
  })
})


/**
 * 参数适配
 */

function doSomeThing(name, title, age, color, size, prize) {}

// 适配器
function doSomeThing(obj) {
  var _adapter = {
    name: 'angelasu',
    title: 'design patterns',
    age: '22',
    color: 'pink',
    size: 707,
    prize: 21
  }
  for (let i in _adapter) {
    _adapter[i] = obj[i] || _adapter[i]
  }
  // do sth..
}


/**
 * 数据适配
 */

var arr = ['js', 'book', 'web', '3/11s']

// 适配成对象
var obj = {
  name: '',
  type: '',
  title: '',
  time: ''
}

function arrToObjAdapter(arr) {
  return {
    name: arr[0],
    type: arr[1],
    title: arr[2],
    time: arr[3],
  }
}

var adapterData = arrToObjAdapter(arr)

console.log(adapterData)


/**
 * 服务端数据适配
 */

function ajaxAdapter(data) {
  return [data['key1'], data['key2'], data['key3']]
}

$.ajax({
  url: 'url',
  success: function(data) {
    if (data) {
      doSomeThing(ajaxAdapter(data))
    }
  }
})
