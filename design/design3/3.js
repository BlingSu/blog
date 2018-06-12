/*
 * @author: angelasu
 * @date: 2018/03/13
 * @description: 装饰者模式
 */

/** 不改变原对象的基础上，通过对其进行包装托章 */

// 输入框提示
var telInput = document.getElementById('tel_input')
// 输入格式提示文案
var telWarnText = document.getElementById('tel_warn_text')
// 点击输入框显示输入框输入格式提示文案
input.onclick = function() {
  telWarnText.style.display = 'inline-block'
}


/**
 * 装饰已有的功能对象
 */

// 装饰者
var decorator = function(input , fn) {
  // 获取事件源
  var input = document.getElementById('input')
  // 若事件源已经绑定事件
  if (typeof input.onclick === 'function') {
    // 缓存事件源原有回调
    var olcClickFn = input.onclick
    // 为事件源定义新的事件
    input.onclick = function() {
      // 事件源原有的回调函数
      olcClickFn()
      // 执行时间源新增回调函数
      fn()
    }
  } else {
    // 事件源未绑定事件，直接为事件源添加新增回调函数
    input.onclick = fn
  }
  // 做其他事情
}

// 使用
decorator('tel_input', function() {
  document.getElementById('tel_demo_text').style.display = 'none'
})
