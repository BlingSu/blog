/*
 * @author: angelasu
 * @date: 2018/03/07
 * @description: 简单工厂模式
 */

// 非简单工厂模式

var LoginAlert = function(text) {
  this.content = text
}
LoginAlert.prototype.show = function() {
  console.log('alert is show')
}
var userNameAlert = new LoginAlert('username')
userNameAlert.show()
var passwordAlert = new LoginAlert('password')
passwordAlert.show()

var LoginConfirm = function(text) {
  this.content = text
}
LoginConfirm.prototype.show = function() {
  console.log('confirm')
  // 显示确认框
}
var loginFailConfirm = new LoginConfirm('username is tan90')
loginFailConfirm.show()

var LoginPrompt = function(text) {
  this.content = text
}
LoginPrompt.prototype.show = function() {
  console.log('prompt')
  // 显示提示框
}
var loginFailPrompt = new LoginPrompt('prompt is tan90')
loginFailPrompt.show()

/**
 * 简单工厂模式
 *
 * 多个类，只提供1个。
 * 封装在一个函数，通过函数创建需要的对象，就不用关注这些对象基于哪些类及为工程函数
 */

// 篮球基类
var Basketball = function() {
  this.intro = 'basketball~~~'
}
Basketball.prototype = {
  getMember: function() {
    console.log('team people 5')
  },
  getBallColor: function() {
    console.log('basketball color')
  }
}


// 足球基类
var Football = function() {
  this.intro = 'football~~~'
}
Football.prototype = {
  getMember: function() {
    console.log('team people 11')
  },
  getBallColor: function() {
    console.log('football color')
  }
}

// 网球基类
var Tennis = function() {
  this.intro = 'tennis~~~'
}
Tennis.prototype = {
  getMember: function() {
    console.log('team people 1')
  },
  getBallColor: function() {
    console.log('tennis color')
  }
}


// 运动工厂
var SprotsFactory = function(name) {
  switch(name) {
    case 'NBA':
      return new Basketball()
    case 'wordCup':
      return new Football()
    case 'FrenchOpen':
      return new Tennis()
  }
}

// 调用创建
var text = SprotsFactory('wordCup')

console.log(text.getMember())


/**
 * 故而上面非工厂模式可以改造一下下
 */
var PopFactory = function(name) {
  switch(name) {
    case 'alert':
      return new Basketball()
    case 'confirm':
      return new Football()
    case 'prompt':
      return new Tennis()
  }
}


/**
 * 3个类是相同的,可以抽象提取
 * 类似于寄生式继承，不过o没有继承任何类或者对象
 */

// 工厂模式
function createBook(name, time, type) {
  var o = new Object()
  o.name = name
  o.time = time
  o.type = type
  o.getName = function() {
    console.log(this.name)
  }
  return o
}

var book1 = createBook('js book', '2018', 'js')
var book2 = createBook('css book', '2018', 'css')

book1.getName()

/**
 * 抽象相同点。比如共有属性this.content, 原型共有方法 show
 */

function createPop(type, text) {
  var o = new Object()
  o.content = text
  o.show = function () { }

  if (type == 'alert') {
    console.log(text)
  }
  if (type == 'confirm') {
    console.log('confirm')
  }
  if (type == 'prompt') {
    console.log('prompt')
  }
  return o
}

var test = createPop('alert', 'username ~~~~')
