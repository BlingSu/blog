/*
 * @author: angelasu
 * @date: 2018/12/11
 * @description: 节流模式。对重复的业务逻辑进行节流控制，执行最后依次操作并取消其他操作，以提高性能。
 */

 const throttle = () => {
   // 获取第一个参数
   let isClear = arguments[0], fn

   // 如果第一个参数是boolean类型那么第一个参数则表示是否清除计时器
   if (typeof isClear === 'boolean') {
     // 第二个参数则为函数
     fn = arguments[1]
     // 函数的计时器句柄存在，则清除该计时器
     fn.__throttleID && clearTimeout(fn.__throttleID)
   } else {
     // 第一个参数为函数
     fn = isClear
     // 第二个参数为函数执行时的参数
     param = arguments[1]

     // 对执行时的参数适配默认值，可以用到extend方法
     let p = extend({
       context: null, // 函数执行的作用域
       args: [],      // 执行函数执行时的相关参数
       time: 300      // 延迟执行的时间
     }, param)
     // 清楚执行函数计时器id
     arguments.callee(true, fn)
    
     // 为函数绑定计时器id，延迟执行函数
     fn.__throttleID = setTimeout(() => {
       fn.apply(p.context, p.args)
     }, p.time);
   }
 }