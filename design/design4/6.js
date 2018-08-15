/*
 * @author: angelasu
 * @date: 2018/08/15
 * @description: 命令模式: 将请求与实现解耦并封装成独立对象，从而使不同的请求对客户端的实现参数化
 */



/**
 * 命令对象
 */

var viewCommand = (function() {
  // 模拟实现模块
  var Action = {
    create: function() {},
    display: function() {}
  }
  // 命令接口
  return function excute() {}
})()


/**
 * 视图创建
 */

var viewCommand = (function() {
  var template = {
    // 展示图片结构模板
    product: [
    `<div>
      <img src="{#src#}" />
      <p>{#text#}</p>
     </div>`
    ].join(''),
    // 展示标题结构模板
    title: [
    `<div class="title">
      <div class="main">
        <h2>{#title#}</h2>
        <p>{#tips#}</p>
      </div>
     </div>`
    ].join('')
  },
  html = ''
  // 格式化字符串
  function formateString(str, obj) {
    return str.replace(/\{#(\w+)#\}/g, function(match, key) {
      return obj[key]
    })
  }
  // 方法集合
  var Action = {}
  // 命令集合
  return function excute() {}
})()

// 创建模块视图就可通过对模块视图数据进行字符串模板格式化来获取，并封装在create方法里

create: function(data, view) {
  if (data.length) {
    for (var i = 0, len = data.length; i < len; i++) {
      html += formateString(template[view], data[i])
    }
  } else {
    html += formateString(template[view], data)
  }
}

display: function(container, data, view) {
  if (data) {
    this.create(data, view)
  }
  document.getElementById(container).innerHTML = html
  html = ''
}


/**
 * 命令接口
 */

return function excute(msg) {
  // 解析命令， 如果msg.param不是数组就转化成数组，apply第二个参数为数组
  msg.param = Object.prototype.toString.call(msg.param) === '[object Array]' ? msg.param : [msg.param]
  Action[msg.command].apply(Action, msg.param)
}



/**
 * 测试
 */

ViewCommand({
  // 参数说明 方法 display
  command: 'display',
  param: ['title', 'titleData', 'title']
})

ViewCommand({
  command: 'create',
  param: [{
    src: 'command.jpg',
    text: 'command text'
  }, 'product']
})
