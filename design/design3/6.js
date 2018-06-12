/*
 * @author: angelasu
 * @date: 2018/03/15
 * @description: 享元模式
 */

// 运用共享技术有效地支持大量的细粒度的对象，避免对象间拥有相同内容造成多余的开销

var dom = null,  // 缓存创建的元素
    paper = 0,  // 当前页数
    num = 5,  // 每页几条
    i = 0,  // 创建元素时保存的变量
    len = article.length  // 数据长度

for (; i < len; i++) {
  dom = document.creatElement('div')
  dom.innerHTML = atricle[i]
  if ( i >= num) {
    dom.style.display = 'none'  // 默认显示第一页，超出隐藏
  }
  document.getElementById('container').appendChild(dom)
}


// 下一页事件
document.getElementById('next_page').onclick = function() {
  var div = document.getElementById('container').getElementsByTagName('div'),

  // 获取所有元素
      j = k = n = 0 // j,k循环变量 n 当前页显示的第一个新闻序号
      n = ++paper % Math.ceil(len / num) * num  // 获取当前页显示的第一个序号
      for (; j < len; j++) {
        div[j].style.display = 'none'
      }
      for (; k < 5; k++) {
        if (div[n + k]) {
          div[n + k].style.display = 'block'
        }
      }
}


/**
 * 享元对象
 */
var Flyweight = function() {
  // 已创建的元素
  var created = []
  // 创建一个包装容器
  function create() {
    var dom = document.creatElement('div')
    document.getElementById('container').appendChild(dom)
    // 缓存新创建元素
    created.push(dom)
    return dom
  }
  return {
    getDiv () {
      if (created.length < 5) {
        return create()
      } else {
        // 获取第一个元素插到最后面
        var div = created.shift()
        created.push(div)
        return div
      }
    }
  }
}



/**
 * 享元动作
 * 共同的动作，所以有一个通用的享元类
 */

var Flyweight = {
  moveX: function (x) {
    this.x = x
  },
  moveY: function (y) {
    this.y = y
  }
}

var Player = function(x, y, c) {
  this.x = x
  this.y = y
  this.color = c
}
Player.prototype = Flyweight
Player.prototype.changeColor = function(c) {
  this.color = c
}

// 继承移动
var man = function(x, y, r) {
  this.x = x
  this.y = y
  this.r = r
}
man.prototype = Flyweight
man.prototype.changeR = function(r) {
  this.r = r
}

var test = new Player(5, 6, '#000')

console.log(test)
