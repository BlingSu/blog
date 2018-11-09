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
