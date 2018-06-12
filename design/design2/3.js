/*
 * @author: angelasu
 * @date: 2018/03/09
 * @description: 抽象工厂模式
 */

/**
 * 抽象类 (可以声明但是不能使用的类，可以手动抛出错误来模拟抽象类)
 * car类中的方法，一旦子类创建一个对象从父类继承没有重写的话，实例化对象就会调用父类，
 * 如果父类有抛出错误，那么可以对忘记重写子类是有帮助的。
 */

var Car = function() {
  Car.prototype = {
    getPrice: function() {
      return new Error('抽象方法不能调用')
    },
    getSpeed: function() {
      return new Error('抽象方法不能调用')
    }
  }
}


/**
 * 抽象工厂模式
 */

var VehicleFactory = function(subType, superType) {
  // 判断抽象工厂中是否有抽象类
  if (typeof VehicleFactory[superType] === 'function') {
    // 缓存类
    function F() {}
    // 继承父类属性和方法
    F.prototype = new VehicleFactory[superType]()
    // 将子类constructor指向子类
    subType.constructor = subType
    // 子类原型继承父类
    subType.prototype = new F()
  } else {
    // 不存在掏出错误
    throw new Error('未创建该抽象类')
  }
}

// 小车抽象类
VehicleFactory.Car = function() {
  this.type = 'car'
}
VehicleFactory.Car.prototype = {
  getPrice: function() {
      return new Error('抽象方法不能调用')
    },
    getSpeed: function() {
      return new Error('抽象方法不能调用')
    }
}

var Lamborghini = function(price, speed) {
  this.price = price
  this.speed = speed
}
// 对象工厂对Car抽象类的继承
VehicleFactory(Lamborghini, 'Car')
Lamborghini.prototype.getPrice = function() {
  return this.price
}
Lamborghini.prototype.getSpeed = function() {
  return this.speed
}

var test = new Lamborghini(1, 2)
console.log(test)
