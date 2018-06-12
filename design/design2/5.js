/*
 * @author: angelasu
 * @date: 2018/03/10
 * @description:原型模式
 */

/**
 * 用原型实例之乡创建对象的类，
 * 使用于创建新的对象的类共享原型对象的属性以及方法
 */


// 轮播图
var LoopImages = function(imgArr, container) {
  this.imgagesArr = imgArr  // 图片数组
  // 构造函数继承图片轮播类
  this.container = container  // 图片容器
  this.createImage = function() {}  // 创建轮播图图片
  this.changeImage = function() {}  // 切换下一张图片
}

// 上下滑动切换类
var SlideLoopImg = function(imgArr, container) {
  // 构造函数继承图片轮播类
  LoopImages.call(this, imgArr, container)
  // 重写继承的切换下一张图片方法
  this.changeImage = function() {
    console.log('SlideLoopImg changeImage function...')
  }
}

// 渐隐切换类
var FadeLoopImg = function(imgArr, container, arrow) {
  LoopImages.call(this, imgArr, container)
  // 切换箭头私有变量
  this.arrow = arrow
  this.changeImage = function() {
    console.log('FadeLoopImg changeImage function')
  }
}

// 实例化一个渐隐切换图片类

var fadeImg = new FadeLoopImg([
  '1.png',
  '2.png',
  '3.png'
], 'side', ['left.png', 'righ.png'])

fadeImg.changeImage()


/**
 * 优化
 * 原型模式就是将可复用的，可共享的，耗时大的基类中提取然后放到原型中
 * 子类通过组合继承，寄生组合继承 继承方法和属性
 * 在子类中需要重写的方法进行重写
 * 结果就是子类创建的对象有子类的属性和方法也共享了基类的原型方法
 */

var LoopImages = function(imgArr, container) {
  this.imgagesArr = imgArr  // 数组
  this.container = container  // 容器
}
LoopImages.prototype = {
  // 创建轮播图片
  createImage () {
    console.log('创建轮播图片')
  },
  // 切换下一张图片
  changeImage () {
    console.log('切换下一张图片')
  }
}

// 上下滑动切换类
var SlideLoopImg = function(imgArr, container) {
  // 构造函数继承图片轮播
  LoopImages.call(this, imgArr, container)
}
SlideLoopImg.prototype = new LoopImages()
// 重写继承的切换下一张图方法
SlideLoopImg.prototype.changeImage = function() {
  console.log('重写继承的切换下一张图方法')
}

// 渐隐切换类
var FadeLoopImg = function(imgArr, container, arrow) {
  LoopImages.call(this, imgArr, container)
  // 切换箭头私有变量
  this.arrow = arrow
}
FadeLoopImg.prototype = new LoopImages()
FadeLoopImg.prototype.changeImage = function() {
  console.log('FadeLoopImg changeImage function')
}

fadeImg.changeImage()


/**
 * 原型继承，通过对对象属性或方法进行复制来实现创建
 */

/**
 * 基于已经存在的模板对象克隆出新的对象的模式
 * 浅复制(引用类型属性共享)
 * 深复制(引用类型属性复制)
 */

function prototypeExted() {
  var F = function() {},  // 缓存类，为实例化返回对象临时创建
      args = arguments,
      i =  0,
      len = args.length
  for (; i <len; i++) {
    // 遍历对象中的属性复制到缓存的原型中
    for (var j in args[i]) {
      F.prototype[j] = args[i][j]
    }
  }
  return new F()
}

var brid = prototypeExted({
  speed: 20,
  fly () {
    console.log('fly speed  ' + this.speed)
  },
  run (speed) {
    console.log('run speed ' + speed)
  }
})

brid.fly()
brid.run(666)
