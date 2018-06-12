/*
 * @author: angelasu
 * @date: 2018/03/11
 * @description: 外观模式
 */

/** 将一组复杂的子系统接口提供一个更高级的统一接口 */


document.onclick = function(e) {
  e.preventDefault()
  if (e.target !== document.getElementById('input')) {
    hidePageAlert()
  }
}
function hidePageAlert() {
  // 隐藏提示框
}


/**
 * 兼容方式。防止重新定义
 */

// 外观模式实现
function addEvent(dom, type, fn) {
  if (dom.addEventListener) {
    // 支持dom2级事件
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    // 不支持addEventListener支持attachEvent
    dom.attachEvent('on' + type, fn)
  } else {
    // 支持on + 事件名
    dom['on' + type] = fn
  }
}


/**
 * 解决 不支持e.target和e.preventDefault()
 */

// 获取事件对象
let getEvent = function(event) {
  // ie 返回 window.event  标准 event
  return event || window.event
}

// 获取元素
var getTarget = function(event) {
  var event = getEvent(event)
  // ie event.srcElement 标准 event.target
  return event.target || event.srcElement
}

// 阻止默认行为
var preventDefault = function(event) {
  var event = getEvent(event)
  if (event.preventDefault) {
    // 标准浏览器
    event.preventDefault()
  } else {
    // ie浏览器
    event.retrunValue = false
  }
}

document.onclick = function(e) {
  // 阻止默认行为
  preventDefault(e)
  // 获取目标
  if (getTarget(e) !== document.getElementById('input')) {
    hideInputSug()
  }
}

// 简约版例子
var A = {
  g (id) {
    return document.getElementById(id)
  },
  css (id, key, value) {
    document.getElementById.style[key] = value
  }
  // ...
}
