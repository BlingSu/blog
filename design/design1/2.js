/*
 * @author: angelasu
 * @date: 2018/03/06
 * @description: 封装-继承-多态
 */

/**
 * 封装
 */

var Book = function(id, bookname, price) {
  this.id = id
  this.bookname = bookname
  this.price = price
}

/**
 * 也可以通过在类的原型上添加
 * 1. 原型对象属性赋值
 * 2，将一个对象赋值给类的原型对象
 */

Book.prototype.display = function() {
  console.log('show this book')
}
/**
 * 或者
 */
Book.prototype = {
  display: function() {}
}

var book = new Book(1, 'book', '20')

console.log(book.price)

/**
 * 属性与方法封装
 * 私有属性和方法: 声明在函数内部的变量以及方法在外界访问不到
 * 对象公有属性和方法: 函数内部通过this创建的属性和方法，在类创建对象时，每个对象自身都拥有一份可以在外部访问到
 * 特权方法: 通过this创建的方法，可以访问对象的公友属性和方法，还能访问类创建时自身的私有属性和私有方法
 * 构造器: 初始化，创建对象时调用特权方法可以看作是类的构造器
 */

var Book = function(id, name, price) {
  // 私有属性
  var num = 1

  // 私有方法
  function checkId() {}

  // 特权方法
  this.getName = function() {}
  this.getPrice = function() {}
  this.setName = function() {}
  this.setPrice = function() {}

  // 对象公有属性
  this.id = id

  // 对象公有方法
  this.copy = function() {}

  // 构造器
  this.setName(name)
  this.setPrice(price)
}


/**
 * 通过new关键字创建新对象时，由于外面通过点语法添加的属性和方法是由执行，所有新创建的对象中是无法获取的，可以通过类来使用。因此外面通过点定义的方法和属性就是类的静态公有属性和公邮方法。而通过prototype创建的在类实例的对象中可以通过this来访问，即prototype对象中的属性和方法称为公有属性和公有方法
 */


// 类静态公有属性(对象不能访问)
Book.isChinese = true

// 类静态公有方法(对象不能访问)
Book.restTime = function() {
  console.log('new time')
}

Book.prototype = {
  // 公有属性
  isBook: false,
  // 公有方法
  display: function() {}
}


var test = new Book(1, '书本', 77)

console.log(test.isChinese)
console.log(test.isBook)
console.log(test.bookname)


/**
 * 闭包实现 (类的静态变量)
 */

利用闭包实现
var Book = (function() {
  // 静态私有变量
  var bookName = 0

  // 静态私有方法
  function checkBook(name) {}

  // 返回构造函数
  return function(mewId, newName, newPrice) {
    // 私有变量
    var name, price
    // 私有方法
    function checkId(id) {}

    // 特权方法
    this.getName = function() {}
    this.getPrice = function() {}
    this.setName = function() {}
    this.setPrice = function() {}

    // 公有属性
    this.id = newId
    // 公有方法
    this.copy = function() {}
    bookName++
    if (bookName > 100)
      throw new Error(`超过100了`)

    // 构造器
    this.setName(name)
    this.setPrice(price)
  }
})()


/**
 * 在闭包外部添加原型属性和方法感觉很像脱离了闭包这个类，所以在闭包内部实现一个完成的类然后将其返回
 */

var Book = (function() {
  var bookNum = 0
  function checkBook(name) {}

  function book(newId, newName, newPrice) {
    var name, price
    function checkId(id) {}

    this.getName = function() {}
    this.getPrice = function() {}
    this.setName = function() {}
    this.setPrice = function() {}

    this.id = newId
    this.copy = function() {}
    bookName++
    if (bookName > 100)
      throw new Error('book > 100')
    this.setName(name)
    this.setPrice(price)
  }
  //  构造原型
  _book.prototype = {
    // 静态公有属性
    isBook: false,
    // 静态公有方法
    display: function() {}
  }
  // 返回类
  return _book
})()


/**
 * 创建对象的安全模式(检测是否犯错)
 */

// 图书类
var Book = function(title, time, type) {
  // 判断this是否只想当前这个对象
  if (this instanceof Book) {
    this.title = title
    this.time = time
    this.type = type
  } else {
    return new Book(title, time, type)
  }
}

// 实例化一本书
var book = Book('javascript', '2018', 'js')
console.log(book)



/**
 * 继承->类式继承
 * 类都有3个部分:
 * 1. 第一部分是构造函数内的，供实例化对象复制用的
 * 2. 第二部分是构造函数外的，通过点语法添加，供类使用，实例化访问不到
 * 3. 第三部分是原型中的，实例化对象可以用过原型链间接访问到，也是为供所有实例化对象所共有的
 */

// 类式继承, 声明父类
function SuperClass() {
  this.superValue = true
}

// 为父类添加公有方法
SuperClass.prototype.getSuperValue = function() {
  return this.superValue
}

// 声明子类
function SubClass() {
  this.subValue = false
}

// 继承父类
SubClass.prototype = new SuperClass()
// 为子类添加公有方法
SubClass.prototype.getSubValue = function() {
  return this.subValue
}

var test = new SubClass()
console.log(test.getSuperValue())
// instanceof 检测某个对象是否是某个类的实例
console.log(subClass instanceof SuperClass)  // false
console.log(subClass.prototype instanceof SuperClass)  // true



/**
 * 构造函数继承
 */

// 声明父类
function SuperClass(id) {
  // 引用类型共有属性
  this.books = ['js', 'html', 'css']
  // 值类型共有属性
  this.id = id
}

// 父类声明原型方法
SuperClass.prototype.showBooks = function() {
  console.log(this.books)
}
// 声明子类
function SubClass(id) {
  /**
   * 继承父类
   * call 可以更改函数的作用环境，可以将子类中的变量在父类执行一遍。故而继承父类的共有属性。
   * 这类的继承没有涉及prototype所以父类的原型方法不会被子类继承，所以必须放在构造函数里面，如果这样，创建出来的每个实例都不会共用，而是单独一份。
   */
  SuperClass.call(this.id)
}

// 创建第一个子类的实例
var test1 = new SubClass(10)
// 创建第二个子类的实例
var test2 = new SubClass(20)

test1.books.push('设计模式')

console.log(test1.books)


/**
 * 组合继承
 * 优点: 融合类式继承和构造函数继承的优点
 * 缺点: 使用构造函数继承时执行了一遍父类的构造函数，子类原型的类式继承又调用了一次
 */

// 组合式继承 声明父类
function SuperClass(name) {
  // 值类型共有属性
  this.name = name
  this.books = ['html', 'css', 'javascript']
}
// 父类原型共有方法
SuperClass.prototype.getName = function() {
  console.log(this.name)
}
// 声明子类
function SubClass(name, time) {
  // 构造函数式继承父类name属性
  SuperClass.call(this, name)
  // 子类中新增共有属性
  this.time = time
}
// 类式继承 子类原型继承父类
SubClass.prototype = new SuperClass()
// 子类原型方法
SubClass.prototype.getTime = function() {
  console.log(this.time)
}

var test = new SubClass('js book', 2014)
test.books.push('设计模式')
console.log(test.getTime())


/**
 * 原型式继承 -> 类似Object.create()
 * 父类对象book中的值类型的属性被复制，引用类型的属性被共用
 */

// 原型式继承
function inheritObject(o) {
  // 声明一个过渡对象
  function F() {}
  // 过渡对象的原型继承父对象
  F.prototype = o
  // 返回过度对象的一个实例
  return new F()
}

var book = {
  name: 'book',
  alikeBook: ['css', 'html', 'js']
}

var newBook = inheritObject(book)
newBook.name = 'test1 book'
newBook.alikeBook.push('jq')

var otherBook = inheritObject(book)
otherBook.name = 'test2 book'
otherBook.alikeBook.push('....book?')

console.log(newBook.alikeBook)


/**
 * 寄生式继承
 */

// 寄生式继承 声明基对象
var book = {
  name: 'book',
  alikeBook: ['css', 'html', 'js']
}

function createBook(obj) {
  // 通过原型继承方式创建对象
  var o = new inheritObject(obj)
  // 拓展新对象
  o.getName = function() {
    console.log(name)
  }
  // 返回拓展后的对象
  return o
}

console.log(createBook(book))


/**
 * 寄生组合式继承
 */


/**
 * 寄生式继承 继承原型
 * 传递参数 subClass 子类
 * 传递参数 superClass 父类
 */

function inheritPrototype(subClass, superClass) {
  // 复制一份父类的原型副本保存在变量中
  var p = inheritObject(superClass.prototype)
  // 修正因为重写子类原型而导致子类constructor属性被修改
  p.constructor = subClass
  // 设置子类的原型
  subClass.prototype = p
}

// 目的就是子类的原型继承父类的原型但是没有执行父类的构造函数

// 父类
function SuperClass(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
// 定义父类原型方法
SuperClass.prototype.getName = function() {
  console.log(this.name)
}

// 定义子类
function SubClass(name, time) {
  // 构造函数继承
  SuperClass.call(this, name)
  // 子类新增属性
  this.time = time
}
// 寄生式继承父类原型
inheritPrototype(SubClass, SuperClass)
// 子类新增原型方法
SubClass.prototype.getTime = function() {
  console.log(this.time)
}

var test1 = new SubClass('js', 2018)
var test2 = new SubClass('css', 2017)

// // 首先创建了父类，父类的原型方法，然后创建子类，在构造函数中实现构造函数继承，然后通过寄生式继承了父类的原型，最后在对子类添加原型和方法
test1.colors.push('black')

console.log(test1)


/**
 * 多继承: 继承多个对象的属性来实现类似多继承
 */

// 单继承 属性复制
var extend = function(target, source) {
  // 遍历所有对象中的属性
  for (var property in source) {
    // 将源对象的属性复制到目标对象中
    target[property] = source[property]
  }
  // 返回目标对象
  return target
}


/**
 * 多继承 属性复制
 * @i: 从第二个参数起为被继承的对象
 * @len: 获取参数长度
 * @target: 第一个对象的目标对象
 * @arg: 缓存参数对象
 */

var mix = function() {
  var i  = 1,
    len = arguments.length,
    target = arguments[0],
    arg

  // 遍历被继承的对象
  for (; i < len; i++) {
    // 缓存当前对象
    arg = arguments[i]
    // 遍历被继承对象中的属性
    for (var property in arg) {
      // 将被继承对象中的属性复制到目标对象中
      target[property] = arg[property]
    }
  }
  return target
}


/**
 * 绑定在原生Object中
 */

Object.prototype.mix = function() {
  var i  = 1,
    len = arguments.length,
    arg

  // 遍历被继承的对象
  for (; i < len; i++) {
    // 缓存当前对象
    arg = arguments[i]
    // 遍历被继承对象中的属性
    for (var property in arg) {
      // 将被继承对象中的属性复制到目标对象中
      this[property] = arg[property]
    }
  }
}


/**
 * 多种调用方式 -> 多态
 */


function add() {
  // 获取参数长度对应返回
  var arg = arguments,
      len = arg.length
      console.log(arg)
  switch(len) {
    case 0:
      return 10
    case 1:
      return 10 + arg[0]
    case 2:
      return arg[0] + arg[1]
  }
}

console.log(add(33))



/**
 * 换种类形式
 */

function Add() {
  function zero() {
    return 10
  }
  function one(num) {
    return 10 + num
  }
  function two(num1, num2) {
    return num1 + num2
  }

  this.add = function() {
    var arg = arguments,
        len = arg.length
        switch(len) {
          case 0:
            return zero()
          case 1:
            return one()
          case 2:
            return two()
        }
  }
}
// 实例化类
var test = new Add()
console.log(test.add())
