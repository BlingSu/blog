/*
 * @author: angelasu
 * @date: 2018/03/19
 * @description: 观察者模式
 */


// 创建一个观察者

var Observer = (function() {
  var _message = {}
  return {
    // type: 消息类型 fn: 相应的处理动作
    regist(type, fn) {
      if (typeof _message[type] === 'undefined') {
        _message[type] = [fn]
      } else {
        _message[type].push(fn)
      }
    },
    // type: 消息类型 args: 动作执行时需要传递的参数
    fire(type, args) {
      if (!_message[type])
        return
      var events = {
        type: type,
        args: args || []
      },
      i = 0,
      len = _message[type].length
      for (; i < len; i++) {
        // 依次执行注册的消息对应的动作序列
        _message[type][i].call(this, events)
      }
    },
    // type: 消息类型 fn: 执行的某一动作
    remove(type, fn) {
      if (_message[type] instanceof Array) {
        var i = _message[type].length - 1
        for (; i >= 0; i) {
          _message[type[i] === fn && _message[type].splice(i, 1)]
        }
      }
    }
  }
})()


Observer.regist('test', function(e) {
  console.log(e.type, e.args.msg, '==============e')
})

Observer.fire('test', {msg: '测试～～～'})



/**
 * 对象间解耦
 */

// 订阅者
var Student = function(result) {
  var _this = this
  _this.result = result
  _this.say = function() {
    console.log(_this.result)
  }
}

Student.prototype.answer = function(question) {
  Observer.regist(question, this.say)
}

Student.prototype.sleep = function(question) {
  console.log(this.result + ' ' + question + ' 已被注销')
  Observer.remove(question, this.say)
}

// 观察者
var Teacher = function() {}

Teacher.prototype.ask = function(question) {
  console.log('问题是 ' + question)
  Observer.fire(question)
}


var student1 = new Student('student1 回答'),
    student2 = new Student('student2 回答'),
    student3 = new Student('student3 回答')

student1.answer('question1')
student2.answer('question2')
student3.answer('question3')
student3.sleep('go sleep')

var teacher = new Teacher()

teacher.ask('teacher ... question1')
teacher.ask('teacher ... question2')
