/*
 * @author: angelasu
 * @date: 2018/12/12
 * @description: 等待者模式。
 * 在特定的作用域中执行给定的函数，并将参数原封不动地传递。
 * 不用实时监听异步逻辑的完成，只需要对注册监听的异步逻辑发生状态改变时（请求成功或者失败）对所有异步逻辑的状态做一次确认迭代。
 */

function Waiter() {
  let content = [],   // 注册了的等待容器
      doneArr = [],
      failArr = [],
      slice = Array.prototype.slice,
      that = this

  // 监控对象类
  let Primise = function() {
    this.resolved = false
    this.rejected = false
  }
  Primise.prototype = {
    // 解决成功
    resolve: function() {
      // 设置当前监控对象解决成功
      this.resolved = true
      if (!content.length) {
        return
      }
      // 遍历所有注册了的监控对象
      for (let i = content.length - 1; i >= 0; i--) {
        // 如果任意一个监控对象没有被解决或者解决失败就return
        if (content[i] && !content[i].resolved || content[i].rejected) {
          return
        }
        // 清除监控对象
        content.splice(i, 1)
      }
      // 执行解决成功回调方法
      _exec(doneArr)
    },
    reject: function() {
      this.rejected = true
      if (!content.length) { // 若无监控个对象则取消执行
        return
      }
      content.splice(0) // 清除所有对象

      // 执行解决失败回调方法
      _exec(failArr)
    }
  }

  // 创建监控对象
  that.Deferred = function() {
    return new Primise()
  }

  // 回调执行方法
  function _exec(arr) {
    let i = 0, len = arr.length
    // 遍历回调数组执行回调
    for (; i < len; i++) {
      try {
        arr[i] && arr[i]()
      } catch(e) {}
    }
  }

  // 监控异步方法 参数: 监控对象
  that.when = function() {
    content = slice.call(arguments) // 设置监控对象
    let i = content.length

    for (--i; i >= 0; i--) {
      // 向前遍历监控对象，最后一个监控对象的索引值为length-1
      if (!content[i] || content[i].resolved || content[i].rejected || !content[i] instanceof Primise) {

        // 清除内存 , 当前监控对象
        content.splice(i, 1)
      }
    }
    return that
  }

  // 解决成功回调函数添加方法
  that.done = function() {
    // 向成功callback容器中添加cb
    doneArr = doneArr.concat(slice.call(arguments))
    // 返回等待着对象
    return that
  }

  // 解决失败回调函数添加方法
  that.fail = function() {
    failArr = failArr.concat(slice.call(arguments))
    return that
  }
}



/**
 * 测试案例。
 */


const waiter = new Waiter()


function first() {
  let listiner = waiter.Deferred()

  setTimeout(function() {
    console.log(`first finish`)

    // listiner.resolve()
    // 假设失败了
    listiner.reject()
  }, 5000)

  return listiner
}

function second() {
  let listiner = waiter.Deferred()
  setTimeout(function() {
    console.log(`second finish`)

    listiner.resolve()
  }, 10000)

  return listiner
}


waiter.when(first(), second()).done(function() {
  console.log(`success`)
}, function() {
  console.log(`success again`)
}).fail(function() {
  console.log(`fail`)
})



/**
 * 类似于jquery的ajax
 */

$.ajax(url)
  .done(function() {}),
  .fail(function() {})
