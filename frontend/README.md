# 前端面试总结
> 涉及不全，仅供参考

## 目录
* HTML
* CSS/CSS3
  - [css3有哪些新属性](#21-css3有哪些新属性)
* Javascript
  - [数据类型](#31-数据类型)
  - [闭包](#32-闭包)
  - [如何实现call函数](#33-如何实现call函数)
  - [如何实现apply函数](#34-如何实现apply函数)
  - [如何实现bind函数](#35-如何实现bind函数)
  - [call和apply的区别是什么](#36-call和apply的区别是什么)
  - [如何实现一个Promise](#37-如何实现一个Promise)
* Http
  - [http和https基本概念](#41-http和https基本概念)
* Vue
* React
* Webpack
* 网络
* 算法
* 其他



## 正文

### 一、HTML  
  #### 1.1 如何实现水平垂直居中
  ```html
  <!-- 表格 -->
  .container {
    width: 100px;
    height: 100px;
    background-color: #eee;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  .center {
    background-color: blue;
  }
  <!-- css3 transform -->
  .container {
    width: 100%;
    height: 100px;
    background-color: #eee;
    postion: relative;
  }
  .center {
    background-color: blue;
    postion: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  <!-- flex -->
  .container {
    width: 100%;
    height: 100px;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;    
  }
  .center {
    width: 100px;
    height: 100px;
    background-color: blue;
    text-align: center;
  }
  ```
### 二、CSS/CSS3  
  
  #### 2.1 CSS3有哪些新属性
  1. 边框:
  * border-radius: 圆角边框
  * box-shadow:  边框阴影
  * border-image: 边框图片
  2. 背景:
  * background-size: 规定背景图片尺寸
  * background-origin: 规定背景图片的定位区域
  3. 文本效果:
  * text-shadow: 文本应用阴影
  * word-wrap: 允许文本进行换行
  4. 字体:
  * @font-face: 规定自定义字体
  5. 2D转换(transform):
  * translate(): 元素从当前位置移动(x,y)坐标
  * rotate(): 顺时针旋转角度(负值为逆时针)
  * scale(): 元素尺寸增加或者减少(宽度和高度, x轴和y轴)
  * skew(): 元素翻转给定的角度(x,y)
  * matrix(): 把2d转换方法组合到一起,需要6个参数，包括旋转、缩放、移动、倾斜元素。
  6. 3D转换:
  * rotateX(): 元素围绕X轴给定的度数进行旋转
  * rotateY(): 元素围绕Y轴给定的度数进行旋转
  7. transition: 过度效果，让页面变化更加平滑圆润
  * transition-property: 执行动画对应的属性，例如color,background等，可以用all来指定所有的属性
  * transition-duration: 过度动画的一个持续时间
  * transition-timing-function: 在延续时间，动画变化的速率
  * transition-dealy: 延迟多久后开始动画
  * :
  8. animation: 动画
  * animation-name: 定义动画名称
  * animation-duration: 元素播放动画所持续的时间
  * animation-timing-function: 动画的播放方式
  * animation-delay: 元素动画开始时间
  * animation-iteration-count: 元素播放动画的循环次
  * animation-direction: 元素动画播放的方向
  * animation-play-state: 元素动画的播放状态
  > 详情部分可以参考[w3school](http://www.w3school.com.cn/css3/index.asp)

  #### 2.2 CSS3有哪些伪类，伪类选择器有哪些
### 三、Javascript   

  #### 3.1 数据类型  
  > Boolean、Null、Undefined、Number、String、Symbol (ECMAScript6新定义)和Object（包含Object、Function、Array）
  
  #### 3.2 闭包
  [详情请参考Javascript闭包](https://github.com/angelasubi/blog/blob/master/md/closure.md)
  ```js
    function foo(x) {
      var y = 1
      return function(z) {
        console.log(x+(++y)+z)
      }
    }

    var bar = foo(2)
    bar(10)
    // result: 14
    ES6中常用let,const块级作用域来代替var
  ```
  #### 3.3 如何实现call函数
  ```js
    Function.prorotype.myCall = function(ctx) {
      let ctx = ctx || window
      ctx.fn = this

      let args = [...arguments].slice(1)
      let res = ctx.fn(...args)
      delete context.fn
      return res
    }
  ``` 

  #### 3.4 如何实现apply函数
  ```js
    Function.prototype.myApply = function(ctx) {
      let ctx = ctx || window
      ctx.fn = this

      let res
      if (arguments[1]) {
        res = ctx.fn(...arguments[1])
      } else {
        res = ctx.fn()
      }

      delete ctx.fn
      return res
    }
  ```

  #### 3.5 如何实现bind函数
  ```js
  Function.prototype.myBind = fucntion(ctx, ...args) {
    let that = this
    let fn = function() {}

    let fbound = function(..._args) {
      that.apply(this instanceof that ? this : ctx, args.concat(_args))
    }
    fn.prototype = this.prototype
    fbound.prototype = new fn()

    return fbound
  }
  ```

  #### 3.6 call和apply的区别是什么
  > [请看这里](https://github.com/angelasubi/blog/blob/master/md/call-apply.md)

  #### 3.7 如何实现一个Promise
  > [请看这里](https://github.com/angelasubi/blog/tree/master/frontend/promise)

### 四、 HTTP

  #### 4.1 http和https基本概念
  HTTP是一种能够获取如 HTML 这样的网络资源的 protocol(通讯协议)。它是是一种 client-server 协议。它超文本传输协议，是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。  
  HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。一个网站接受一个HTTP的请求，然后跳转到HTTPS，用户可能在开始跳转前，通过没有加密的方式和服务器对话，比如，用户输入http://github.com或者直接github.com。这样存在中间人攻击潜在威胁，跳转过程可能被恶意网站利用来直接接触用户信息，而不是原来的加密信息。网站通过HTTP Strict Transport Security通知浏览器，这个网站禁止使用HTTP方式加载，浏览器应该自动把所有尝试使用HTTP的请求自动替换为HTTPS请求。
