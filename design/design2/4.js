/*
 * @author: angelasu
 * @date: 2018/03/10
 * @description: 建造者模式
 */

// 将一个复杂对象的构建层与其表示层相互分离

// 创建一个人类
var Human = function(param) {
  // 技能
  this.skill = param && param.skill || '保密'
  // 兴趣爱好
  this.hobby = param && param.hobby || '保密'
}

// 类人原型方法
Human.prototype = {
  getSkill () {
    return this.skill
  },
  getHobby () {
    return this.hobby
  }
}

// 实例化姓名类
var Named = function(name) {
  var that = this
  // 构造器 构造函数解析姓名的姓与名
  that.wholeName = name
  if (name.indexOf(' ') > -1) {
    that.FirstName = name.slice(0, name.indexOf(' '))
    that.secondName = name.slice(name.indexOf(' '))
  }
  // (function(name, that) {
  //   that.wholeName = name
  //   if (name.indexOf(' ') > -1) {
  //     that.FirstName = name.slice(0, name.indexOf(' '))
  //     that.secondName = name.slice(name.indexOf(' '))
  //   }
  // })(name, that)
}

// 实例化职位类
var Work = function(work) {
  var that = this
  // 构造器 构造函数中通过传入的职位特征来设置相关职位以及描述
  switch(work) {
    case 'code':
      that.work = '工程师'
      that.workDescript = '写代码...'
      break
    case 'UI':
    case 'UE':
      that.work = '设计师'
      that.workDescript = '画画图..'
    default :
      that.work = work
      that.workDescript = '没有相关～'
  }
}

// 更换期望的职位
Work.prototype.changeWork = function(work) {
  this.work = work
}

// 添加对职位的描述
Work.prototype.changeDescript = function(setence) {
  this.workDescript = setence
}


// 创建一名应聘者，如上面抽象的3个类
// 写一个建造者，通过对3个类组合调用，可以创建一个完整的应聘者


/**
 * 建造者
 * @name: 全名
 * @work: 期望职位
 */
var Person = function(name, work) {
  // 创建应聘者缓存对象
  var _person = new Human()
  // 创建应聘者姓名解析对象
  _person.name = new Named(name)
  // 创建应聘者期望姓名
  _person.work = new Work(work)

  return _person
}

var person = new Person('龙 爷', 'code')

console.log(person)
