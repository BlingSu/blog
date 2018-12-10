/*
 * @author: angelasu
 * @date: 2018/12/06
 * @description: 备忘录模式。在不破坏对象的封装性的前提下，在对象之外捕获并保存该对象内部的状态以便日后对象使用或者对象恢复到以前的某个状态
 */

// 备忘录类
var Page = function() {
  // 信息缓存对象
  var cache = {}
  /**
   * 主函数
   * 参数 page 页码
   * 参数fn 成功会调函数
   */
  return function(page, fn) {
    // 判定这一页的数据在不在缓存中
    if (cache[page]) {
      // 恢复到该页状态，显示该页内容
      showPage(page, cache[page])
      //  执行成功回调函数
      fn && fn()
    } else {
      // 若缓存cache中无该页数据,携带数据page页面
      $.post(url, { page: page }, function(res) {
        if (res.err) {
          // 显示该数据
          showPage(page, res.data)
          该页数据放入缓存
          cache[page] = res.data
          fn && fn()
        } else {
          // throw err
        }
      })
    }
  }
}
