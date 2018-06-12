/*
 * @author: angelasu
 * @date: 2018/03/13
 * @description: 组合模式
 */

// 将对象组合成树形结构以标示"部门整体"的层次结构

var News = function() {
  // 子组件容器
  this.children = []
  // 当前组件元素
  this.element = null
}

News.prototype = {
  init () {
    throw new Error('请重写方法')
  },
  add () {
    throw new Error('请重写方法')
  },
  getElement () {
    throw new Error('请重写方法')
  },
}


/**
 * 容器类
 * 应用寄生组合式继承
 */

// 容器类构造函数
var Container = function(id, parent) {
  // 构造函数继承父类
  News.call(this)
  // 模块id
  this.id = id
  // 模块的父容器
  this.parent = parent
  // 构建方法
  this.init()
}

// 寄生式继承父类原型方法
inheritPrototype(Container, News)
// 构建方法
Container.prototype.init = function() {
  this.element = document.createElement('ul')
  this.element.id = this.id
  this.element.calssName = 'new-container'
}
// 添加子元素方法
Container.prototype.add = function(child) {
  // 在子元素容器插入子元素
  this.children.push(child)
  // 插入当前组件元素树中
  this.element.appendChild(child.getElement())
  return this
}
// 获取当前元素的方法
Container.prototype.getElement = function() {
  return this.element
}


/**
 * 创建一个新闻类
 */

var ImageNews = function(url, href, classname) {
  News.call(this)
  this.url = url || ''
  this.href = href || '#'
  this.classname = classname || 'normal'
  this.init()
}
inheritPrototype(ImageNews, News)
ImageNews.prototype.init = function() {
  this.element = document.createElement('a')
  var img = new Image()
  img.src = this.url
  this.element.appendChild(img)
  this.element.className = 'image-news' + this.classname
  this.element.href = this.href
}
ImageNews.prototype.add = function() {}
ImageNews.prototype.getElement = function() {
  return this.element
}


var test = new Container('news', document.body)
test.add(new ImageNews('normal').add().add())
