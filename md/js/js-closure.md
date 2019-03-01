# 词法作用域

> 闭包是函数和声明该函数的词法环境的组合

```js
function init() {
  var name = 'dragon'
  function displayName() {
    alert(name)
  }
  displayName()
}
init()
```

init() 创建了一个局部为name和一个名为displayName的函数。displayName是在init函数内部，仅只能在init里面使用它。displayName内部没有自己的局部变量，它可以访问外部的变量，所以可以使用init里面定义的name。如果有同名的name在displayName中被定义，则会使用函数内部也就是displayName中的name。


## 闭包

```js
function makeFunc() {
  var name = 'dragon'
  function displayName() {
    alert(name)
  }
  return displayName
}

var myFunc = makeFunc()
myFunc()

```

在这里，这个makeFunc代码和init的效果是一样的，但是在执行函数的时候，内部函数displayName()在执行前，被外部函数返回。  

JavaScript中的函数会形成闭包。闭包是由函数以及创建该函数的词法环境组合，这个环境包含了这个闭包创建时所能访问的所有全局变量。在makeFunc函数中，myFunc是执行makeFunc时创建的displayName函数实例的引用，而displayName实例仍可以访问其词法作用域中的变量，即可以访问到name。由此可见，当myFunc被调用的时候，name仍可被访问，其name就会被传递到alert中。


```js
function makeAdder(x) {
  return function(y) {
    return x + y
  }
}

var add5 = makeAdder(5)
var add10 = makeAdder(10)

console.log(add5(2))  // 7
console.log(add10(2))  // 12
```

从本质上说，makeAdder是一个函数工厂，它创建了将指定的值和它的参数相加求和的函数。  
add5 和 add10都是闭包。他们共享相同的函数定义，但是保存了不同的词法环境。在add5中，x为5，而在add10中，x为10。

## 实用的闭包

闭包允许将函数与其所操作的某些数据（环境）关联起来。在面向对象编程中，对象允许将某些数据（对象的属性）与一个或者多个方法相关联。  
因此，通常使用只有一个方法的对象的时候都可以用到闭包。  

比如在页面上添加一些可以调整字体的按钮，一种以px来指定单位（body), 然后通过通过相对单位em来设置其他元素。

```css
body { font-size: 12px }
h1 { font-szie: 1.5em; }
h2 { font-szie: 1.2em; }
```

```js
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = `${size}px`
  }
}

var size12 = makeSizer(12)
var size14 = makeSizer(14)
```

## 闭包模拟私有方法

在JavaScript中没有支持将方法声明为私有的。所以可以用闭包来模拟私有方法。私有方法不仅仅有利于限制对代码的访问，还提供了管理全局命名空间的强大能力，避免非核心的方法混淆了代码公共的部分。

```js
var Counter = (function() {
  var initCounter = 0
  function changeBy(value) {
    initCounter += value
  }
  return {
    increment() {
      changeBy(1)
    },
    decrement() {
      changeBy(-1)
    },
    value() {
      return initCounter
    }
  }
})()

console.log(Counter.value()) // 0
Counter.increment()
console.log(Counter.value()) // 1
Counter.decrement()
console.log(Counter.value()) // 0
```

在上面看的例子中，可以发现我们只创建了一个词法环境，为三个函数共享: increment, decrement, value。  
共享环境创建于一个立即执行的匿名函数体内。这个环境包含了两个私有项: initCounter和changeBy。这两个私有项都是无法在这个匿名函数外部直接访问的，必须通过匿名函数返回的三个公共函数访问。  
这三个公共函数是共享一个环境的闭包。我们定义的是一个匿名函数，用于创建计数器。我们可以立即执行这个匿名函数，并且将值赋予变量counter。我们可以把函数存储到一个makeCounter变量中，用于创建多个计数器（由于每个闭包都是独立性的，不会相互影响）

```js
var makeCounter = function() { // do sth }

var counter1 = makeCounter()
var counter2 = makeCounter()
```


## 在循环中使用闭包

在没有块级作用域之前，也就是没有let的时候，循环会出现一个常见的闭包创建问题。如下:

```html
<p id="help">help help help</p>
<p>email: <input type="text" id="email" name="email" /></p>
<p>name: <input type="text" id="name" name="name" /></p>
<p>age: <input type="text" id="age" name="age" /></p>
```

```js
fcuntion showHelp(help) {
  document.getElementById('help').innerHTML = 'help 😁'
}

function setupHelp() {
  var helpText = [
    {id; 'email', help: 'you email'},
    {id; 'name', help: 'you name'},
    {id; 'age', help: 'you age'}
  ]

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i]
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help)
    }
  }
}
setupHelp()

```

运行代码后，会发现无论聚焦在哪个input上，显示的都是关于年龄的信息。  
原因是赋值给onfocus的是闭包。这个闭包是由他们的函数定义在setupHelp作用域中捕获的环境所组成的。这三个闭包在循环中被创建，共享同一个词法作用域，在这个作用域中存在item这个变量。当onfocus的回调执行时，item.help的值就被决定了。由于循环在事件触发前造就执行完毕，变量item(被三个闭包所共享)已经指向了helpText的最后一项。

> 解决方案:   
1. 使用上述的函数工厂

```js
function showHelp(help) {
  document.getElementById('help').innerHTML = 'help 😁'
}

function makeHelpCallback(help) {
  return function() {
    showHelp(help)
  }
}

fcuntion setupHelp() {
  var helpText = [
    {id; 'email', help: 'you email'},
    {id; 'name', help: 'you name'},
    {id; 'age', help: 'you age'}
  ]

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i]
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help)
  }
}
setupHelp()

```
所有的回调不在共享同一个环境，makeHelpCallback函数为每一个回调创建一个新的词法作用域。在这些环境中，help指向helpText数组中的对应的字符串

2. 匿名闭包

```js
function showHelp(help) {
  document.getElementById('help').innerHTML = 'help 😁'
}

fcuntion setupHelp() {
  var helpText = [
    {id; 'email', help: 'you email'},
    {id; 'name', help: 'you name'},
    {id; 'age', help: 'you age'}
  ]
  for (var i = 0; i < helpText.length; i++) {
    (function() {
      var item = helpText[i]
      document.getElementById(item.id).onfocus = function() {
        showHelp(item.help)
      }
    })()
  }
}
setupHelp()

```

在for循环中用立即执行函数把当前循环项的item与事件回调关联起来。

3. let 关键字

```js
function showHelp(help) {
  document.getElementById('help').innerHTML = 'help 😁'
}

fcuntion setupHelp() {
  var helpText = [
    {id; 'email', help: 'you email'},
    {id; 'name', help: 'you name'},
    {id; 'age', help: 'you age'}
  ]
  for (var i = 0; i < helpText.length; i++) {
    let item = helpText[i]
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help)
    }
  }
}
setupHelp()
```
let让每一个闭包都绑定了块作用域的变量，故而不需要闭包啦～

## 性能考量

如果不是某些特殊情况，在函数中创建函数是不好的，因为闭包会对处理速度和内存消耗方面产生负面的影响。  

例如在创建新的对象或类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。如果定义到了对象的构造器中，那么将导致每次构造器被调用时候，方法都会被重新赋值一次！

例子: 

```js
function obj(name, msg) {
  this.name = name.toString()
  this.msg = msg.toString()
  this.getName = function() {
    return this.name
  }
  this.getMsg = function() {
    return this.msg
  }
}
```

利用闭包修改一下:

```js
function obj(name, msg) {
  this.name = name.toString()
  this.msg = msg.toString()
}

obj.prototype = {
  getName() {
    return this.name
  }
  getMsg() {
    return this.msg
  }
}
```

不重新定义原型的话: 

```js
function obj(name, msg) {
  this.name = name.toString()
  this.msg = msg.toString()
}
obj.prototype.getName = function() {
  return this.name
}
obj.prototype.getMsg = function() {
  return this.name
}
```

## 总结

具体性的了解了闭包的原理以及使用场景😁，待续