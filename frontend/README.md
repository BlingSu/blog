# 前端面试总结
> 涉及不全，仅供参考

## 目录
* HTML
* CSS/CSS3
  - [css3有哪些新属性](#21-css3有哪些新属性)
* Javascript
  - [数据类型](#31-数据类型)
  - [闭包](#32-闭包)
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
### 二、CSS/CSS3  
  
  #### 2.1 css3有哪些新属性
  1. 边框:
  * <font color=#DC143C>border-radius</font>: 圆角边框
  * <font  color="#DC143C">box-shadow</font>:  边框阴影
  * <font  color="#DC143C">border-image</font>: 边框图片
  2. 背景:
  * <font color="#DC143C">background-size</font>: 规定背景图片尺寸
  * <font color="#DC143C">background-origin</font>: 规定背景图片的定位区域
  3. 文本效果:
  * <font color="#DC143C">text-shadow</font>: 文本应用阴影
  * <font color="#DC143C">word-wrap</font>: 允许文本进行换行
  4. 字体:
  * <font color="#DC143C">@font-face</font>: 规定自定义字体
  5. 2D转换(<font color="#DC143C">transform</font>):
  * <font color="#DC143C">translate()</font>: 元素从当前位置移动(x,y)坐标
  * <font color="#DC143C">rotate()</font>: 顺时针旋转角度(负值为逆时针)
  * <font color="#DC143C">scale()</font>: 元素尺寸增加或者减少(宽度和高度, x轴和y轴)
  * <font color="#DC143C">skew()</font>: 元素翻转给定的角度(x,y)
  * <font color="#DC143C">matrix()</font>: 把2d转换方法组合到一起,需要6个参数，包括旋转、缩放、移动、倾斜元素。
  6. 3D转换:
  * <font color="#DC143C">rotateX()</font>: 元素围绕X轴给定的度数进行旋转
  * <font color="#DC143C">rotateY()</font>: 元素围绕Y轴给定的度数进行旋转
  7. transition: 过度效果，让页面变化更加平滑圆润
  * <font color="#DC143C">transition-property</font>: 执行动画对应的属性，例如color,background等，可以用all来指定所有的属性
  * <font color="#DC143C">transition-duration</font>: 过度动画的一个持续时间
  * <font color="#DC143C">transition-timing-function</font>: 在延续时间，动画变化的速率
  * <font color="#DC143C">transition-dealy</font>: 延迟多久后开始动画
  * <font color="#DC143C"></font>:
  8. animation: 动画
  * <font color="#DC143C">animation-name</font>: 定义动画名称
  * <font color="#DC143C">animation-duration</font>: 元素播放动画所持续的时间
  * <font color="#DC143C">animation-timing-function</font>: 动画的播放方式
  * <font color="#DC143C">animation-delay</font>: 元素动画开始时间
  * <font color="#DC143C">animation-iteration-count</font>: 元素播放动画的循环次
  * <font color="#DC143C">animation-direction</font>: 元素动画播放的方向
  * <font color="#DC143C">animation-play-state</font>: 元素动画的播放状态
  > 详情部分可以参考[w3school](http://www.w3school.com.cn/css3/index.asp)
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
### 四、 HTTP

  #### 4.1 http和https基本概念
  HTTP是一种能够获取如 HTML 这样的网络资源的 protocol(通讯协议)。它是是一种 client-server 协议。它超文本传输协议，是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。  
  HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。一个网站接受一个HTTP的请求，然后跳转到HTTPS，用户可能在开始跳转前，通过没有加密的方式和服务器对话，比如，用户输入http://github.com或者直接github.com。这样存在中间人攻击潜在威胁，跳转过程可能被恶意网站利用来直接接触用户信息，而不是原来的加密信息。网站通过HTTP Strict Transport Security通知浏览器，这个网站禁止使用HTTP方式加载，浏览器应该自动把所有尝试使用HTTP的请求自动替换为HTTPS请求。
