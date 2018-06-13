# this

函数的this关键字在JavaScript中，函数的调用方式决定了this的值。this不能在执行期间被赋值，并且每次函数被调用的时候this的值也可能会不同(在严格模式和非严格模式下也是有差别的)。

## 全局上下文

无论在严格模式或者非严格模式下，在全局执行上下文中，也就是任何函数体外，this都是指向全局对象。

```js
// 在浏览器中， window对象同时也是全局对象
console.log(this === window) // true

a = 1
console.log(window.a) // 1

this.b = 'dragon'
console.log(window.b) // dragon
console.log(b) // dragon
```

## 函数上下文

在函数内部， this的值决定函数被调用的方式

### 简单应用

> 非严格模式

```js
function f1() {
  return this // this的值不是由该调用设置的，所以this的值默认指向全局对象
}
// 在浏览器中
f1() === window // true

// 在node中
f1() === global // true
```

> 严格模式下 this将保持它进入执行上下文时的值，所以this就是undefined

```js
function f2() {
  "use strict"
  return this
}

f2() === undefined // true
```

f2是直接调用的，而不是作为对象的属性或者方法，比如window.f2() 所以肯定是undefined

> 如果要把this从一个上下文传到另外一个上下文，可以用call或者apply方法  
具体的话可以参考另外一篇文章[深入理解call和apply](https://github.com/angelasubi/blog/blob/master/md/call-apply.md)  

```js
var obj = {name: 'dragon'}
var name = 'global'

function whatThis(arg) {
  return this.name
}

whatThis() // global
whatThis.call(obj) // global 
whatThis.apply(obj) // global
```

如果传递给的this的值不是一个对象，那么JavaScript会使用内部toObject操作转换成对象，类似这样:  
```js
Object.prototype.toString.call(this)
```


### bind方法

掉用f.bind(someObject)会创建一个和f具有相同函数体和作用域的函数，在新的函数中，this将永久的绑定到bind的第一个参数。

```js
function f() {
  return this.a
}

var g = f.bind({a: 'dragon'})
console.log(g()) // dragon

var h = g.bind({a: 'dragon'}) //bind只生效一次
console.log(h()) // dragon

var o = {a: 1, f:f, g:g, h:h}
console.log(o.f(), o.g(), o.h()) // 1, dragon. dragon
```