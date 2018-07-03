# 谈谈JavaScript模块化

## 前言

由于对模块化一知半解，特想知根知底，故而记录此文。

## 为什么要模块化
* 网站慢慢变成web应用程序
* 站点变大，代码复杂性增加
* 最优化的部署代码
* 分离JS文件／模块

## 从设计模式开始

### 传统写法

> 污染全局导致命名冲突

```js
function func1() {}
function func2() {}
```

### 简单封装（命名空间模式）

> 减少了全局变量，但本质上还是一个对象，依旧不安全
```js
var MYOBJ = {
  func1: function() {},
  func2: function() {}
}
MYOBJ.func1()
```

### 匿名闭包（IIFE模式）

> 函数是JavaScript的唯一作用域

```js
var Module = (function() {
  var PRIVATE = `private variable`
  var func = function() {
    console.log(PRIVATE)
  }

  return {
    func: func
  }
})()

Module.func()
Module.PRIVATE // undefined
```

### 引入依赖（jQuery）

> 最<b>基础，简单</b>的模块模式

```js
var Module = (function($) {
  var $body = $('body')
  var func = function() {
    console.log($body) // 具有特殊权利的方法
  }
  return {
    func: func
  }
})(jQuery)

Module.func()
```

## 按需加载

> DOM的顺序就是执行顺序

```js
body 
  script(src="jquery.js")
  script(src="index.js") 
  // do sth
```

如果script引入过多的话就会出现各种问题，比如:
1. 维护系数增加
2. 依赖模糊，乱七八糟
3. 请求太多，卡到爆

然后出现了[方案LAB](https://github.com/getify/LABjs) 

## LAB

> 执行顺序不重要的时候

```js
script(src="LAB.js" async)

$LAB.script("jquery.js").wait()
    .script("plugin1.jquery.js")
    .script("plugin2.jquery.js").wait()
    .script("init.js")
```

> 基于文件的依赖管理

```js
$LAB
  .script(["a.js", "b.js", "c.js"])
  .wait(function(){
    aFun()
    bFun()
    cFun()
  })
```

## 模块加载器（YUI）
[YUI]((https://github.com/yui/yui3))具有轻量级，模块化架构使其具有扩展性，快速性和强大性。

### 编写模块

```js
YUI.add(`dom`, function(Y) {
  Y.DOM = { ... }
})
```

### 使用模块
```js
YUI.use(`dom`, function(Y) {
  Y.DOM.doSth()
  // 使用许多方法在Y上
})
```

### 创建一个自定义模块

> 基于模块的依赖管理

```js
// hello.js
YUI.add('hello', function(Y) {
  Y.sayHello = function(msg) {
    Y.DOM.set(el, 'innerHTML', 'Hello')
  }
}, '3.0.0', {
  requires: ['dom']
})

// main.js
YUI().use('hello', function(Y) {
  Y.sayHello(`yui loader .....`)
})
```

Y 其实就是一个沙箱，所有的依赖模块通过attach的方式被注入沙盒。  

```js
script(src="yui.js")
script(src="module1.js")
script(src="module2.js")
script(src="module3.js")

YUI.use('module1', 'module2', 'module3', function(Y) {
  // use all module now to do sth
})
```

## CommonJS

### 模块的定义与引用（MODULES/1.0）

```js
// math.js
export.add = function(a, b) {
  return a + b
}

// index.js
var math = require('math')
console.log(math.add(1, 2)) // 3
```


### 简单的http服务
```js
// server.js

var http = require('http')
    PORT = 8080
http.createServer((req, res) => {
  res.end(`Hello World`)
}).listen(PORT)

console.log(`listening to ` + PORT)
```

### 同步/阻塞式加载

```js
// time.js

var TIME = 2
(function(second) {
  var start = +new Date()
  while(start + second * 1000 > new Date()) {}
})(TIME)

console.log(`2000ms 执行`)
```

```js
// index.js
require('./time.js') // 同步执行
console.log('done')
```


## AMD/CMD（浏览器环境模块化）

* AMD：RequireJS对模块定义的规范化产出
* CMD：SeaJS对模块定义的规范化产出

### 如果require()是异步的

```js
// commonJS 语法
var Test = require('types/test')

function func() {
  // do sth
}

func.prototype = new Test()

// 假设成立的话。那么肯定是报错了。因为在执行这句的时候上面的加载还没进来。
```

### 功能包装
> AMD 包装

```js
define(
  ['types/test'], // 依赖
  function(Test) {
    function func() {
      // do sth
    }

    func.prototype = new Test()
    return func // 返回一个 构造函数
  }
)
```

> CommonJS 包装

```js
define(function(require) {
  var d1 = require('d1')
      d2 = require('d2')
  return function() {}
})
```

### 书写风格（AMD vs CommonJS）

> Module/1.0
```js
var a = require('./a') // 依赖就近
a.doSth()

var b = require('./b')
b.doSth()
```

> AMD 推荐方式
```js
define(['a', 'b'], function(a, b) {  // 依赖前置
  a.doSth()
  b.doSth()
})
```
#### 执行机制（AMD vs CommonJS）

```js
// Module/1.0
var a = require('./a') // a同步下载并且执行
```

```js
define(['require'], function(require) {
  // 已经下载好了，并且执行好了
  var a = require('./a')
})
```

## CMD

常见的CommonJS方式

```js
define(function(require, exports) {
  var a = require('./a')
  a.doSth()

  exports.foo = 'bar'
  exports.doSth = function() {}
})
```

RequireJS 兼容风格
```js
define('hello', ['jquery'], function(require, exports, module) {
  return {
    foo: 'bar',
    doSth: function() {}
  }
})
```

### ADM和CMD真正不同的地方

AMD 推荐写法
```js
define(['a', 'b'], function(a, b) {
  a.doSth()   // 依赖前置，提前执行
  b.doSth()
})
```

CMD 推荐写法

```js
define(function(require, exports. module) {
  var a = require('a')
  a.doSth()
  var b = require('b')
  b.doSth()   // 依赖就近，延迟执行
})
```