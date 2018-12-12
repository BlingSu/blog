/*
 * @author: angelasu
 * @date: 2018/12/12
 * @description: 简单模版模式。通过格式化字符串拼凑出视图避免创建视图时大量节点操作，优化内存开始。
 */

// 命名空间
const A = A || {}
// 主体展示区域容器
A.root = document.getElementById('container')

// 创建视图方法集合
A.strategy = {
  // 文字列表
  'listPart': function(data) {
    tpl = A.view(['h2', 'p', 'ul'])
    liTpl = A.formatString(A.view('li'), {
      li: A.view(['strong'], 'span')
    })
  },
  'codePart': function() {},
  'onlyTitle': function() {},
  'guide': function() {}
  // ...
}
// 创建视图入口
A.init = function(data) {
  // 根据传输的视图类型创建视图
  this.strategy[data.type](data)
}

// 模版渲染方法
A.formatString = (str, data) => {
  return str.replace(/\{#(\w+)#\}/g, (match, key) => {
    return typeof data[key] === undefined ? '' : data[key]
  })
}

// 模板生成器name：标识
A.view = (name) => {
  let v = {
    // 代码模板
    code: '<pre><code>{#code#}</code></pre>',
    // 图片模板
    img: '<img src="{#src#}" alt="{#alt#}" title="{#title#}" />',
    // 带有id和类的模块模板
    part: '<div id="{#id#}" class="{#class#}">{#part#}</div>',
    // 组合模板
    theme: [
      '<div>',
        '<h1>{#title#}</h1>',
        '{#content#}',
      '</div>'
    ].join('')
  }

  // 如果是数组返回多行模板
  if (Object.prototype.toString.call(name) === '[object Array]') {
    let tpl = ''
    for (let i = 0; i < name.length; i++) {
      // 模板缓存器追加模板
      tpl += arguments.callee(name[i])
    }
    return tpl
  } else {
    return v[name] ? v[name] : ('<' + name + '>{#' + name + '#}</' + name + '>')
  }
}
