# JavaScript 原型到原型链

## 构造函数创建对象

```js
function Person() {}
var person = new Person()
person.name = 'Dragon'
console.log(person.name) // Dragon
```
Person 就是一个构造函数，使用new实例化一个对象person

## prototype

每个函数都有一个prototype属性

```js
function Person() {}

Person.prototype.name = 'Dragon'
var person1 = new Person()
var person2 = new Person()
console.log(person1.name)  // 'Dragon'
console.log(person2.name)  // 'Dragon'
```

从上面可以发现person1和person2打印出的值都是 'Dragon', 到底函数prototype属性指向的是什么？  

每一个JavaScript对象(null除外)在创建的时候就会关联另外一个对象，这个对象就是原型，每一个对象都会从原型继承属性。所以函数的prototype属性指向了一个对象，这个对象就是调用该构造函数实例化的原型，也就是person1和person2的原型。  

<img src="../img/prototype1.png" />

## __proto__ 

每一个JavaScript对象(除了null)都具有一个属性，叫__proto__，这个属性会指向该对象的原型。

```js
function Person() {}
var person = new Person()
console.log(person.__proto__ === Person.prototype) // true
```


<img src="../img/prototype2.png" />

如果实例对象和构造函数都可以指向原型，那么是否有属性可以指向构造函数或者实例？

## constructor

因为一个构造函数可以生成多个实例，所以指向实例是没有的。但是原型指向构造函数是有的，每个原型都有一个constructor属性指向关联的构造函数  

```js
function Person() {}
console.log(Person === Person.prototype.constructor) // true
```

<img src="../img/prototype3.png" />

所以:  

```js
function Person() {}
var person = new Person()

console.log(person.__proto__ === Person.prototype) // ture

console.log(Person.prototype.constructor === Person) // true

console.log(Object.getPrototypeof(person) === Person.prototype) // true

```


## 实例和原型

当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还找不到，就找原型中当原型，直到找到位置。  

```js
function Person() {}

Person.prototype.name = 'dragon'

var person = new Person()
person.name = 'dragon2'
console.log(person.name) // dragon2

delete person.name
console.log(person.name) // dragon
```

在这里，我们给person添加name属性，当打印person.name的时候，就会出现 dragon2   

当删了perosn的name的时候，读取person.name在person对象中就找不到name的属性，那么person的原型就是person.__proto__，也就是Person.prototype中查找，索性是找到了。。。  

如果没找到，那就要继续找，直到找到原型的原型啦～

## 原型的原型

```js
var obj = new Object()
obj.name = 'dragon'
console.log(obj.name) // dragon
```

所以原型对象就是通过Object构造函数生成的。

<img src="../img/prototype4.png" />

## 原型链

```js
console.log(Object.prototype.__proto__ === null) // true
```
所以Object.prototype.__proto__的值为null和Object.prototype没有原型是一样的，所以找到Object.prototype就不用继续找了

<img src="../img/prototype5.png" />


## 补充

### constructor

```js
function Person() {}
var person = new Person()
console.log(person.constructor === Person) // true
```

当获取person.constructor时候，person里面是没有constructor的，就会从person.prototype中获取,所以:

```js
Person.constructor === Person.prototype.constructor
```

### __proto__

__proto__不存在Person.prototype中，因为他来自于Object.prototype，可以当作是一个getter/setter,当使用到obj.__proto__时，可以理解成返回了Object.getPrototypeOf(obj)


## 总结
简单的了解一下原型与原型链，还需继续深入，待续。