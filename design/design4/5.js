/*
 * @author: angelasu
 * @date: 2018/08/10
 * @description: 职责链模式
 */

/**
 * 解决请求的发送和请求的接收之间的耦合，通过职责链上多个对象的分解，实现请求在多个对象中的传递，直到完成为止。
 */


// 异步请求 (简化版)

var sendData = function(data, dealType, dom) {
  var xhr = new XMLHttpRequest()
  var url = 'url'
  xhr.onload = function(e) {
    if ((xhr.staus >= 200 && xhr.status < 300) || xhr.status == 304) {
      dealData(xhr.responseText, dealType, dom)
    } else {
      return `请求失败`
    }
  }
  for (var i in data) {
    url += `&${i}=${data[i]}`
  }
  xhr.open('get', url, true)
  xhr.send(null)
}


// 适配响应 ajax

var dealData = function(data, dealType, dom) {
  var dataType = Object.prototype.toString.call(data)
  switch(dealType) {
    case: 'test':
      if (dataType === '[object Array]') {
        return createDialog(data, dom)
      }
      if (dataType === '[object Object]') {
        var newData = []
        for (var i in data) {
          newData.push(data[i])
          return createDialog(newData, dom)
        }
        return createDialog([data], dom)
        break
      }
    case: 'validate':
      return createValidateResult(data, dom)
  }
}


// 根据响应数据创建组件

var createDialog = function(data, dom) {
  var i = 0,
      len = data.length,
      html = ''
  for (; i < len; i++) {
    html += `<li>${data[i]}</i>`
  }
  dom.parentNode.getElementsByTagName('ul')[0].innerHTML = html
}


var createValidateResult = function(data, dom) {
  dom.parentNode.getElementsByTagName('span')[0].innerHTML = data
}
