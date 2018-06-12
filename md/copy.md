# JavaScript深拷贝和浅拷贝

## 堆和栈的区别

深拷贝和浅拷贝的区别在于内存和储存类型不同  

```
栈(stack)为自己分配的内存空间，由系统自动释放;  
堆(heap)为动态分配的内存，大小不定也不会自动释放。
```

## ECMAScript数据类型

### 基本数据类型: undefined, Boolean, Number, String, null, Object, symbol

#### 基本数据类型存在栈中

存放在栈内存中的数据大小可以确定，内存空间大小可以分配，是直接按值存放的，可以直接访问

#### 基本数据类型值不可变
```js
var str = 'test'

console.log(str[1] = '6') // 6

console.log(str) // test
```

#### 基本类型的比较是值的比较
只要值等，那么就相等

```js
var a = 1
var b = 1
console.log(a === b) // true
```

如果用 == 会进行类型转换

```js
var a = 1
var b = true
console.log(a == b) // true
```

### 引用类型

#### 引用类型存放在堆中

引用类型是存在在堆内存中的，变量实际上是一个存放在栈内存的指针，这个指针指向堆内存中的地址。每个空间大小不一样，需要根据实际情况去分配。

```js
var person1 = {name: 'abc'}
var person2 = {name: 'def'}
var person3 = {name: 'ghj'}
```

#### 引用类型值可变

```js
var a = [1,2,3]
a[1] = 6
console.log(a[1]) // 6
```

#### 引用类型的比较

当我们每次对js的引用类型进行操作的时候，实际上是操作其对象的引用，也就是存放在栈内存中的指针

```js
var a = [1,2,3]
var b = [1,2,3]
console.log(a === b) // false
```
为什么为false？因为在内存中的位置不一样，也就是指向的不是同一个对象，所以是不等的！

### 传值和传值

在我们进行赋值操作的时候，基本数据类型的赋值，也就是等于号(=) 是在内存中开辟一个栈内存，然后再把值赋值到新的栈中。

```js
var a = 10
var b = a 

a++

console.log(a) // 11
console.log(b) // 10

```

故而，基本类型的赋值的两个变量是两个独立相互不影响的变量。  

引用类型的赋值是传址。说白了就是: 引用类型的赋值是对象保存在栈中的地址的赋值，所以两个变量就指向同一个对象，因此两者之间操作就会互相影响。

```js
var a = {}
var b = {}
a.name = 'dragon'

console.log(a.name) // dragon
console.log(b.name) // dragon

b.age = 22
console.log(b.age) // 22
console.log(a.age) // 22

console.log(a === b) // true
```

## 浅拷贝

```js 
var obj1 = {
  name: 'dragon',
  age: 22,
  val: [1,[2,3],[4,5]]
}

var obj2 = obj1

var obj3 = shallowCopy(obj) {
  var res = {}
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      res[i] = obj[i]
    }
  }
  return res
}

obj2.name = 'test'
obj3.age = 11

obj3.val[1] = ['javascript']
obj2.val[1] = ['html']

console.log(obj1, obj2, obj3)
```
从上面的代码可以看出:

* obj1: 原始数据
* obj2: 赋值操作得到
* obj3: 浅拷贝得到 

通过改变ojb2的name和obj3的age，可以看到修改obj2会同时改变obj1，而浅拷贝ojb3则不会去影响obj1，说明了赋值得到的对象obj2只是将指针改变了，引用的仍然是同一个对象，而浅拷贝得到的obj3则是重新创建了一个新的对象。  

紧接着修改obj3的val或者obj2的val，结果可以看出，无论是修改复制得到的对象obj2还是浅拷贝得到的obj3都会改变原始数据obj1。为什么？因为val是个数组，也就是引用类型！并且浅拷贝只是复制一层对象的属性，并不包括对象里面为引用类型的数据，所以就会出现改变obj3的引用类型的时候，原始数据会得到改变。  


Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象

```js
var t = {
  a: 1,
  b: {f: {g: 1}},
  c: [1,2,3]
}
var k = Object.assign({}, t)

console.log(t.b.f === k.b.f) // true

```


## 深拷贝

1. JSON对象的parse和stringify  
JSON对象的parse方法可以将JSON字符串反序列化成js对象，stringify方法可以将js对象序列化成JSON字符串，借助这个方法，可以实现对象的深拷贝


```js
var t = {
  a: 1,
  b: {f: {g: 1}},
  c: [1,2,3]
}
var k = JSON.parse(JSON.stringify(t))

k.c[1] = 0

console.log(k.c[1]) // 0
console.log(t.c[1]) // 2
```

2. 手动实现深拷贝

```js
(function($) {
  'use strict'
  var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ')

  function type() {
    return Object.prototype.toString.call(this).slice(8, -1)
  }

  for (var i = types.length; i--;) {
    $['is' + types[i]] = (function (_this) {
      return function (ele) {
        return type.call(ele) === _this
      }
    })(types[i])
	}
  return $
})(window.$ || (window.$ = {})) // 类型判断

function copy(obj, deep) {
  if (obj === null || (typeof obj !== 'object' && !$.isFunction(obj))) {
    return obj
  }
  if ($.isFunction(obj)) {
    return new Function(`return${obj.toString()}`)()
  } else {
    var name, target = $.isArray(obj) ? [] : {}, value

    for (name in obj) {
      value = obj[name]

      if (value === obj) {
        continue
      }

      if (deep) {
        if ($.isArray(value) || $.isObject(value)) {
          target[name] = copy(value, deep)
        } else if ($.isFunction(value)) {
          target[name] = new Function(`return${value.toString()}`)()
        } else {
          target[name] = value
        }
      } else {
        target[name] = value
      }
    }
    return target
  }
}

```



## 总结
综上，由数据类型到深浅拷贝，说明基础贼重要👀