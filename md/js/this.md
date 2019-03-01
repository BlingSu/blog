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

### 箭头函数

在箭头函数中，this与封闭词法上下文的this保持一致。在全局代码中，将设置为全局对象。

```js
var globalObject = this
var foo (() => this)
console.log(foo() === globalObject) // true
```

如果 this 传递给call, bind, apply。那么会被忽略，不过可以为调用添加参数，但是第一个参数thisArg必须设置为null

```js
var obj = {foo: foo}
console.log(obj.foo() === globalObject) // true

// 用call 来设定 this
console.log(foo.call(obj) === globalObject) // true

// 使用bind
foo = foo.bind(obj)
console.log(foo() === globalObject) // true
```

不管怎么样，foo的this被设置为它的创建时的上下文，同样适用于其他函数内创建的箭头函数，箭头函数的this被设置为封闭的词法上下文。

```js
/*
 * 创建一个含有bar方法的obj对象
 * bar 返回一个函数， 函数返回this
 * 返回的函数是由箭头函数创建的
 * 所以this永远绑定到了外层函数的this
 * bar的值可以在调用中设置，反过来又设置啦返回函数的值
 * 
*/
var obj = {
  bar() {
    var x = (() => this)
    return x
  }
}
// obj对象的一个方法来调用bar，把this绑定到obj，返回的函数的引用赋值给fn
var fn = obj.bar()
// 直接掉用fn不设置this，在这里是全局，严格模式下是undefined
console.log(fn() === obj) // true

// 引用 没调用
var fn2 = obj.bar
// 调用后 this指向window，从bar继承了this
console.log(fn2()() === window) // true
```

### 作为对象的方法

当函数作为对象里的方法被调用时，它们的this是调用该函数的对象

```js
var obj = {
  prop: 22,
  f() {
    return this.prop
  }
}
console.log(obj.f()) // 22
```

可以先定义函数，然后附属到对象里

```js
var obj = {prop: 22}
function func() {
  return this.props
}
obj.f = func

console.log(obj.f()) // 22
```

#### 原型链中的this

如果方法存在于一个对象的原型链上，那么this指向的是调用这个方法的对象。

```js
var o = {
  f() {
    return this.a + this.b
  }
}

var p = Object.create(o)
p.a = 1
p.b = 4
console.log(p.f()) // 5
```
对象p没有属于自己的f属性，所以它的f属性继承于原型。虽然是在o中找的f属性。查找的过程首先从p.f的引用开始，所以函数的this指向p，因为f是最为p的方法掉用的，所以它的this指向了p。

#### getter和setter中的this

函数在一个getter或者setter中被调用也可以，都会把this绑定到设置或者获取属性的对象上。

```js
function sum() {
  return this.a + this.b + this.c
}
var o = {
  a: 1,
  b: 2,
  c: 3,
  get average() {
    return (this.a + this.b + this.c) / 3
  }
}

Object.defineProperty(o, 'sum', {
  get: sum,
  enumerable: true,
  configurable: true
})

consoe.log(o.average, o.sum) // 2, 6
```

### 作为构造函数

当创建构造函数的时候，它的this被绑定到正在构造的新对象

```js
function F() {
  this.a = 22
}
var o = new F()
console.log(o.a) // 22


function F2() {
  this.a = 22
  return {a: 2333}
}
o = new F2()
console.log(o.a) // 2333
```

在调用构造函数F2的时候，手动设置了返回对象，与this绑定的默认对象被丢弃了。所以是 2333

### 作为DOM事件的处理函数

当函数被用作事件处理函数时，它的this指向触发事件的元素

```js
var eles = document.getelementsByTagName('*')

for (let i = 0; i < eles.length; i++) {
  eles[i].addEventListener('click', () => {
    console.log(this)
  }, false)
}
```

### 作为内联事件处理函数

```html
<button onclick="alert(this)"></button>
```