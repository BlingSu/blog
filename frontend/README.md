# 前端面试总结
> 涉及不全，仅供参考

## 目录
* HTML
* CSS/CSS3
* Javascript
  - [数据类型](#31-数据类型)
  - [闭包](#32-闭包)
* Http
* Vue
* React
* Webpack
* 网络
* 算法
* 其他



## 正文

### 一、HTML  
### 二、CSS/CSS3  
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