# JavaScript实现发布／订阅(Pub/Sub)模式

## 说在前面
一般来说前端的MVVM框架是软件的设计模式的一种。在这种模式中，一个目标对象管理所有相依于它的观察者对象，并且在它本身的状态改变时主动发出通知。这通常通过呼叫各观察者所提供的方法来实现。这种模式通畅被用来实时事件处理系统。


## 解释

发布／订阅模式(Pub/Sub)是一种消息模式，它有两个参与者： 发布者和订阅者。 发布者向某个信道发布一条消息，订阅者绑定这个信道，当有消息发布至信道的时候就会接受到一个通知。最重要的是，发布者和订阅者是相互解耦的，彼此不知道对方的存在。两者共享一个信道名称。


## 实现

> 一个发布者一般有三个主要的方法： 订阅，发布，退订。

先来写个订阅:

```js
var PubSub = {}
var eventObj = {}
PubSub.subscribe = function(event, fn) {
  eventObj[event] = fn
}
```

再来写一个发布:
```js
PubSub.publish = function(event) {
  if (eventObj[event]) {
    eventObj[event]()
  }
}
```


最后来一个退订:

```js
PubSub.off = function(event, fn) {
  if (eventObj[event]) {
    eventObj[event] = null
  }
}
```

总的来整理一下，大致就是这样:

```js
var PubSub = (function() {
  var eventObj = {}
  return {
    subscribe: function(event, fn) {
      eventObj[event] = fn
    },
    publish: function(event) {
      if (eventOjb[event]) [
        eventObj[event]()
      ],
      off: function(event) {
        if (eventObj[event]) {
          delete eventObj[event]
        }
      }
    }
  }
})()
```

测试看看： 
```js
PubSub.subscribe('event', function() {
  console.log(`event release`)
})

PubSub.publish('event') 
// event release

```

在上述代码中，一个事件只能绑定一个操作，并且取消订阅会把整个事件删除掉。所以应该写一个事件绑定多个操作的，并且退订的时候是退订一个事件上的操作，而不是删除所有事件，所以我们应该一是一个事件绑定多个操作，用数组把操作保存起来，发布时订按订阅顺序执行，退订时删除对应数组的元素就行了。

```js
var PubSub = (function(){
  var queue = {}
  var subscribe = function(event, fn) {
    if (!queue[event]) {
      queue[event] = []
      queue[event].push(fn)
    }
  }
  var publish = function(event) {
    var eventQueue = queue[event],
        len = eventQueue.length
    if (eventQueue) {
      eventQueue.forEach((item, index) => {
        item()
      })
    }
  }
  var off = function(event, fn) {
    var eventQueue = queue[event]
    if (eventQueue) {
      queue[event] = eventQueue.filter(item => item !== fn)
    }
  }

  return {
    subscribe: subscribe,
    publish: publish,
    off: off
  }
})()
```

测试一波：
```js
function first() { console.log(`event a publish first`) }

PubSub.subscribe(`a`, first)
PubSub.subscribe(`a`, () => { console.log(`event a publish second`) })
PubSub.publish(`a`)
PubSub.publish(`a`)
```

## 总结
以上，如果还是不明白的话可以这么理解：   

假设我去报刊亭订了一本书籍，当老板把书籍送给我了，我去领了看。在这里<b>“我”</b>就是订阅者，<b>"报刊亭"</b>就是发布者，当书籍送到的时候（状态发生了改变，通知了我，也就是订阅者），我去领回来看了一下（做了某些操作）。