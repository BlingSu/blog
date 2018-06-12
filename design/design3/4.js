/*
 * @author: angelasu
 * @date: 2018/03/13
 * @description: 桥接模式
 */


// 多维度变化的同时，不增加负责度并且降低耦合达到解耦

var spans = document.getElementsByTagName('span')
// 绑定特效
spans[0].onmouseover = function() {
  this.style.color = 'red'
  this.style.background = '#ddd'
}
spans[0].onmouseout = function() {
  this.style.color = '#333'
  this.style.background = '#fff'
}
spans[0].onmouseover = function() {
  this.getElementsByTagName('strong')[0].style.color = 'red'
  this.getElementsByTagName('strong')[0].style.background = '#ddd'
}
spans[1].onmouseover = function() {
  this.getElementsByTagName('strong')[0].style.color = '#333'
  this.getElementsByTagName('strong')[0].style.background = '#fff'
}
// ...


/**
 * 抽象  提取共同点
 */

function changeColor(dom, color, bg) {
  dom.style.color = color
  dom.style.background = bg
}

var spans = document.getElementsByTagName('span')

span[0].onmouseover = function() {
  changeColor(this, 'red', '#ddd')
}

span[0].onmouseout = function() {
  changeColor(this, '#333', '#fff')
}


/**
 * 多元化对象
 */

function Speed(x, y) {
  this.x = x
  this.y = y
}

Speed.prototype.run = function() {
  console.log('Go Go Go~~~')
}

// 着色单元
function Color(color) {
  this.color = color
}
Color.prototype.draw = function() {
  console.log('draw color')
}
// 变形单元
function Shape(shape) {
  this.shape = shape
}
Shape.prototype.change = function() {
  console.log('change shape')
}
// 说话单元
function Speek(word) {
  this.word = word
}
Speek.prototype.say = function() {
  console.log('write font')
}


// 创建一些类 做相应的事情
function People(x, y, f) {
  this.speed = new Speed(x, y)
  this.font = new Speek(f)
}
People.prototype.init = function() {
  this.speed.run()
  this.font.say()
}

var test = new People(10, 12, 30)
test.init()
