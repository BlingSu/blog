# 类数组对象

何为类数组对象:

> 拥有一个 length 属性和若干索引属性的对象

Example: 

```js 
let arr = ['a', 'b', 'c']

let arr2 = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}
```


## 读写

```js
console.log(arr[0]) // a
console.log(arr2[0]) // a

arr[0] = 'dragon'
arr2[0] = 'dragon'

```

## 长度

```js
console.log(arr.legnth) // 3
console.log(arr2.length) // 3

```

## 遍历

```js
for (let i = 0; i < arr.length; i++) {
  // do sth
}

for (let i = 0; i < arr2.length; i++) {
  // do sth
}
```

虽然感觉一样！但是如果操作数组的话是不行的

```js
arr2.push('d') // arr2.push is not a function
```

## 数组方法

所以如果是类数组转数组则用Function.call 间接调用

```js
let arr2 = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}

// 1. slice
Array.prototyep.slcie.call(arr2) // ['a', 'b', 'c']

// 2. splice
Array.prototyep.splcie.call(arr2, 0) // ['a', 'b', 'c']

// 3. Array.from
Array.from(arr2) // ['a', 'b', 'c']

// 4. apply
Array.prototyep.concat.apply([], arr2) // ['a', 'b', 'c']
```

Arguments 也是一个类数组对象， 比如在操作Dom的时候(document.getElementsByTagName())之类的会返回一个伪数组，也就是类数组对象。  

## Arguments 对象

Arguments对象只定义在函数体中，包括了函数的参数和其他属性。在函数体中，arguments指代该函数的arguments对象。

```js
function foo(a, b, c) {
  console.log(arguments)
}

foo('a', 'b', 'c') 

/**
  * 打印如下:
  * Arguments[3]
  *   0: 'a'
  *   1: 'b'
  *   2: 'c'
  *   callee: foo(a,b,c)
  *   length: 3
  *   Symbol(Symbol.iterator): values()
  *   __proto__: Object
  */  
```

可以发现除了索引和length属性之外，还有callee属性等。


## length 属性
Arguments 对象的length属性，表示实参的长度: 

```js
function foo(a, b, c,) {
  console.log(`实参长度: ${arguments.length}`)
}

console.log(`形参的长度: ${foo.length}`)

foo(1)
```


## callee 属性

Arguments对象的callee属性，通过它可以调用函数自身

```js
let data = []

for (let i = 0; i < 3; i++) {
  (data[i] = function() {
    console.log(arguments.callee.i)
  }).i = i
}

data[0]() // 0
```

## arguments 和对应参数的绑定

```js
function foo(name, age, sex, address) {
  console.log(name, arguments[0]) // name name

  // 改变形参
  name = 'new name'
  console.log(name, arguments[0]) // new name new name

  // 改变arguments
  arguments[1] = 'new age'
  console.log(age, arguments[1]) // new age new age

  // 未传入
  console.log(sex) // undefined

  sex = 'new sex'

  console.log(sex，arguments[2]) // new sex undefined

  arguments[3] = 'new address'
  console.log(address, arguments[3]) // undefiend new address
}

foo('name', 'age')

通过以上的代码可得出:  
传入的参数会和实参共享，没有传入的时候则不会共享
如果再严格模式下，是不会共享的
```

## ES6

使用es6 解构 可以转成数组

```js
function foo(...arguments) {
  console.log(arguments)
}

foo(1, 2, 3)
```

## 总结
arguments 可以用在很多场景。如:  
1. 柯里化
2. 递归
3. 重载
...