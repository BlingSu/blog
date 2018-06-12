/*
 * @author: angelasu
 * @date: 2018/03/19
 * @description: 状态模式
 */


/**
 * 状态对象实现
 */

var resultState = function() {
  var State = {
    state0: function() {
      console.log('0')
    },
    state1: function() {
      console.log('1')
    },
    state2: function() {
      console.log('2')
    }
  }

  function show(result) {
    State['state' + result] && State['state' + result]()
  }

  return {
    show: show
  }
}()

resultState.show(1)



/**
 * 状态的优化
 */

var lyState = function() {
  //  内部状态私有变量
  var _currentState = {},

  // 动作与方法状态映射
  states = {
    jump: function() {
      console.log('jump')
    },
    move: function() {
      console.log('move')
    },
    shot: function() {
      console.log('shot')
    }
  }

  // 动作控制类
  var Action = {
    // 改变状态方法
    changeState: function() {
      console.log(arguments, 'arguments')
      var arg = arguments
      _currentState = {}
      if (arg.length) {
        for (let i = 0; i < arg.length; i++) {
          _currentState[arg[i]] = true
        }
      }
      return this
    },
    // 执行动作
    goes: function() {
      console.log('触发一次')
      console.log(_currentState, '_currentState')
      for (let i in _currentState) {
        states[i] && states[i]()
      }
      return this
    }
  }
  return {
    change: Action.changeState,
    goes: Action.goes
  }
}

var test = new lyState()
test.change('jump').goes()
