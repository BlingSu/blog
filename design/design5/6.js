/*
 * @author: angelasu
 * @date: 2018/12/12
 * @description: 惰性模式。 减少每次代码执行时间的重复的分支判断，通过对对象重定义来屏蔽元对象中的分支判断。
 */


/**
 * 创建XHR对象
 */

const createXHR = () => {
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest()
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      let versions = [
        'MSXML2.XMLHttp.6.0',
        'MSXML2.XMLHttp.3.0',
        'MSXML2.XMLHttp'
      ],
        i = 0,
        len = versions.length;

      for (; i < len; i++) {
        try {
          new ActiveXObject(versions[i])
          arguments.callee.activeXString = versions[i]
          break
        } catch(e) {}
      }
    }
    return new ActiveXObject(arguments.callee.activeXString)
  } else {
    throw new Error(`browser no support ajax...`)
  }
}


/**
 * 加载时候损失性能，但是第一调用时候不损失性能
 */

const createXHR = (() => {
  if (typeof XMLHttpRequest != 'undefined') {
    return () => {
      return new XMLHttpRequest()
    }
  } else if (typeof ActiveXObject != 'undefined') {
    return () => {
      // ...
    }
  } else {
    return () => {
      throw nw Error(`No XHR object available.`)
    }
  }
})()


/**
 * 加载时候不损失性能，但是第一次调用的时候损失性能
 */

const createXHR = () => {
  if (typeof XMLHttpRequest != 'undefined') {
    createXHR = () => {
      return new XMLHttpRequest()
    }
  } else if (typeof ActiveXObject != 'undefined') {
    createXHR = () => {
      // ...
    }
  } else {
    createXHR = () => {
      throw new Error(`No XHR object available.`)
    }
  }
  return createXHR()
}
