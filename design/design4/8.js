/*
 * @author: angelasu
 * @date: 2018/11/30
 * @description: 中介者模式，通过中介者对象封装一系列对象之间的交互，使对象之间不再相互饮用，降低他们之间的耦合。
 */

// 中介者对象

var Mediator = function() {
  // 消息对象
  var _msg = {
    return {
      /**
       * 订阅消息方法
       * 参数type    消息名称
       * 参数action    消息callback
       */
      register: function(type, action) {
        if (_msg[type]) {
          // 消息存在存入callback
          _msg[type].push(action)
        } else {
          // 否则建立消息容器存入新消息callback
          _msg[type] = []
          _msg[type].push(action)
        }
      },
      /**
       * 发布消息方法
       * 参数 type 消息名称
       */
      send: function(type) {
        // 如果消息被订阅， 遍历消息中的callback
        if (_msg[type]) {
          for (var i = 0, len = _msg[type].length; i < len; i++) {
            _msg[type][i] && _msg[type][i]()
          }
        }
      }
    }
  }
}()

// 单元测试
Mediator.register('demo', function() {
  console.log(`1`)
})
Mediator.register('demo', function() {
  console.log(`2`)
})

Mediator.send('demo') // 1 2
