/*
 * @author: angelasu
 * @date: 2018/03/19
 * @description: 策略模式
 */


/**
 * 策略对象
 */

var priceStrategy = function() {
  var stragtegy = {
    return30: function(price) {
      return +price + parseInt(price / 100) * 30
    },
    return50: function(price) {
      return +price + parseInt(price / 100) * 50
    }
  }
  return function(alogrithm, price) {
    return stragtegy[alogrithm] && stragtegy[alogrithm](price)
  }
}()

var test = priceStrategy('return50', '100')

console.log(test)


/**
 * 表单验证
 */

var InputStrategy = function() {
  var stragtegy = {
    notNull: function(value) {
      return /\s+/.test(value) ? '请输入内容': ''
    },
    number: function(value) {
      return /^[0-9]+(\.[0-9]+)?$/.test(value) ? '' : '请输入数字'
    },
    phone: function(value) {
      return /^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/.test(value) ? '' : '请验证是否为手机号'
    }
  }
  return {
    check: function(type, value) {
      value = value.replace(/^\s+|\s+$/g, '')
      return stragtegy[type] ? stragtegy[type](value) : '没有该类型的检测方法'
    },
    addStrategy: function(type, fn) {
      stragtegy[type] = fn
    }
  }
}()

// 拓展
InputStrategy.addStrategy('nickname', function(value) {
  return /^[a-zA-z]\w{3,7}$/.test(value) ? '' : '请输入4-8昵称'
})


var test2 = InputStrategy.check('number', 'test')
console.log(test2)
