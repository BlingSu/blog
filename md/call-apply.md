# call和apply的区别

> 在JavaScript中，call, apply, bind 是Function对象自带的三个方法，主要用于改变this的指向。

## apply()

apply 方法传入两个参数: 一个作为函数上下文的对象，另外一个是作为函数参数所组成的数组。

```js
var obj = {
  name: 'dragon'
}

function name(firstName, lastName) {
  console.log(`${firstName} ${this.name} ${lastName}`)
}

name.apply(obj, ['1', '2']) // 1 dragon 2
```

obj是作为函数上下文的对象，函数name中this指向obj这个对象。

## call()

call 方法第一个参数是作为函数上下稳的对象，后面传入的是一个参数列表，而不是单个数组。

```js
var obj = {
  name: 'dragon'
}

function name(firstName, lastName) {
  console.log(`${firstName} ${this.name} ${lastName}`)
}

name.call(obj, '4', '5') // 4 dragon 5
```


## apply 和 call 的用法

1. 改变this的指向

```js
var obj = {name: 'dragon'}
function getName() {
  console.log(this.name)
}

getName.call(obj) // dragon
```
call的第一个参数作为函数上下文的对象，把obj作为参数传给了getName，所以函数内的this指向了obj，所以相当于:

```js
function getName() {
  console.log(obj.name)
}
```

2. 继承大法

```js
var Person1 = function() {
  this.name = 'dragon'
}
var Person2 = function() {
  this.getName = function() {
    console.log(this.name)
  }
  Person1.call(this)
}

var person = new Person2()
person.getName() // 'dragon'
```

在Person2中，继承了Person1的属性和方法。通过Person1对象代替this对象。

3. 函数的调用

apply, call方法都会让函数丽姬执行

```js
function name() {
  console.log('dragon')
}

name.call() // dragon
```

## call 和 bind 的区别

bind是ES5新增的一个方法，传参和call类似，但是又和call/apply不同，当调用call和apply的时候会自动执行对应的函数，而bind不会执行对应的函数，只是返回堆函数的引用。  

大概的意思就是说，由于call/apply会对目标函数自动执行，从而导致它无法在事件绑定函数中使用，因为事件绑定函数不需要手动执行，它是事件被出发时由JS内部自动执行的。所以bind可以完美实现改变函数内部this的同时又不会自动执行目标函数。

1. bind的返回值是函数

```js
var obj = {name: 'dragon'}
function name() {
  console.log(this.name)
}

var getName = name.bind(obj)

getName() // dragon
```

bind 方法不会立即执行，而是返回一个改变了上下文this后的函数。而原函数的this并没有改变，还是是指向window

2. 参数的使用

```js
function name(a, b, c) {
  console.log(a, b, c)
}
var name1 = name.bind(null, 'dragon')

name(1, 2, 3) // 1, 2, 3
name1(1, 2, 3) // dragon 1, 2
name1(2, 3) // dragon 2, 3
name.call(null, 'dragon') // dragon undefined undefined
```

call 是把第二个及以后的参数作为name方法的实参传进去，而name1方法的实参则是在bind中参数的基础上往后排。

> 如果浏览器不支持bind方法，则自己实现一下。

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError(`Function.prototype.bind - what is tring to be bound is not callable..`)
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function() {},
        fBound = function() {
          return fToBind.apply(this instanceof fNOP
          ? this
          : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)))
        }
    if (this.prototype) {
      fNOP.prototype = this.prototype
    }
    fBound.prototype = new fNOP()

    return fBound
  }
}

```