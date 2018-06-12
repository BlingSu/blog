/*
 * @author: angelasu
 * @date: 2018/03/16
 * @description: 模版方法模式
 */

/**
 * 将多个模型抽象化归一
 * 比如提示框
 */

var Alert = function(data) {
  if (!data) return
    this.panel = document.createElement('div')
}

Alert.prototype = {
  init: function() {
    this.panel.appendChild(this.closeBtn)
    document.body.appendChild(this.panel)
    // 绑定事件
    this.bindEvent()
    this.show()
  },
  bindEvent () {
    var _this = this
    this.closeBtn.onclick = function() {
      _this.fail()
      _this.hide()
    }
    this.confirmBtn.onclick = function() {
      _this.success()
      _this.hide()
    }
  }，
  hide: function() {
    this.panel.style.display = 'none'
  },
  show: function() {
    this.panel.style.display = 'block'
  }
}

var RightAlert = function(data) {
  Alert.call(this, data)
  this.confirmBtn.className = this.confirmBtn.className + ' right'
}
RightAlert.prototype = new Alert()

// 标题提示框
var TitleAlert = function(data) {
  // 继承基本提示框构造函数
  Alert.call(this, data)
  // 设置标题内容
  this.title = data.title
  // 设置标题组件
  this.titleNode = document.createElement('h3')
  // 标题内容
  this.titleNode.innerHTML = this.title
}
// 继承基本提示框
TitleAlert.prototype = new Alert()
// 基本提示框创建方法拓展
RightAlert.prototype.init = function() {
  this.panel.insertBefore(this.titleNode, this.panel.firstChild)
  // 继承基本的init
  Alert.prototype.init.call(this)
}

// 带有取消按钮的框
var CancleAlert = function(data) {
  // 继承标题提示框的构造函数
  TitleAlert.call(this, data)
  this.cancel = data.cancel
  this.cancelBtn = document.createElement('span')
  this.cancelBtn.className = 'cancel'
  this.cancelBtn.innerHTML = this.cancel || '取消'
}

// 继承标题提示框原型方法
CancleAlert.prototype = new Alert()
CancleAlert.prototype.init = function() {
  // 继承标题提示框创建方法
  TitleAlert.prototype.init.call(this)
  this.panel.appendChild(this.cancelBtn)
}
CancleAlert.prototype.bindEvent = function() {
  var _this = this
  // 标题提示框绑定方法继承
  TitleAlert.prototype.bindEvent.call(_this)

  this.cancelBtn.onclick = function() {
    _this.fail()
    _this.hide()
  }
}

// 实例
new CancleAlert({
  title: 'title',
  content: 'content',
  success: function() {},
  fail: function() {}
}).init()
