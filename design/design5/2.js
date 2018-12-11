/*
 * @author: angelasu
 * @date: 2018/12/11
 * @description: 委托模式。多个对象接受并处理同一个请求，将请求委托给另外一个对象统一处理请求。
 */

 /**
  * 点击日历交互
  * 没点一个日期鸽子颜色变
  */

  const ul = document.getElementById('container'),
        li = document.getElementsByTagName('li'),
        i = li.length - 1
  for (; i >= 0; i--) {
    li[i].onclick = function() {
      this.style.backgroundColor = '#fff'
    }
  }

  /**
   * 委托服元素
   * 将子元素的事件委托给更高层面上的父元素去绑定执行
   */

   ul.onclick = function(e) {
     let e = e || window.event,
        target = e.target || e.srcElement
      if (target.nodeName.toLowerCase() === 'li') {
        target.style.backgroundColor = '#fff'
      }
   }