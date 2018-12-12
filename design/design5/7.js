/*
 * @author: angelasu
 * @date: 2018/12/12
 * @description: 参与者模式。  在特定的作用域中执行给定的函数，并将参数原封不动地传递。
 */

// 函数绑定 bind
const bind = (fn, context) => {
  return () => {
    return fn.apply(context, arguments)
  }
}

const demoObj = { title: 'example...' }

const demoFn() {
  console.log(this.title)
}

const bindFn = bind(demoFn, demoObj)
demoFn() // undefined
bindFn() // example...


// 应用于事件

const btn = document.getElementsByTagName('button')[0]
const demoFn = () => {
  console.log(arguments, this)
}
const bindFn = bind(demoFn)
btn.addEventListener('click', btn)


/**
 * name: 柯里化
 * desc: 根据传递的参数不同，可以让一个函数存在多种状态
 */

 if (Function.prototype.bind === undefined) {
  Function.prototype.bind = (context) => {
    let Slice = Array.prototype.slice,
        args = Slice.call(arguments, 1),
        that = this
    return () => {
      // 把泪数组转化成数组
      let addArgs = Slice.call(arguments),
          // 拼接参数，传入的参数放到了后面
          allArgs = args.concat(addArgs)

      return that.apply(context, allArgs)
    }
  }
 }


/**
 * 反柯里化
 */

Function.prototype.uncurry = function() {
  let that = this
  return function() {
    return Function.prototype.call.apply(that, arguments)
  }
}

// 当用 Object.prototype.toString校验对象时

let toString = Object.prototype.toString.uncurry()
console.log(toString(function() {})) // [object Function]
console.log(toString([]) // [object Array]


// 用push方法为对象添加数据成员

let push = [].push.uncurry()
let obj = {}
push(obj, '1', '2')
console.log(obj) // {0: '1', 1: '2', length: 2}
