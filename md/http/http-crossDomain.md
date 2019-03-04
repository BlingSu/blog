# 跨域、代理

## 域名空间结构

|名称类型|说明|示例|
|:----- |:-------|----- |
|根域 |全球13台根逻辑域名服务器 |单个句点(.) |
|顶级域 |类型名称 |.com|
|第二层域 |个人或者组织在网上注册名称 |github.com|
|子域 |已注册的二级域名派生的域名 |www.github.com|  


|DNS域名名称|cn|com|net|edu|Mil|gov|
|:----- |:-------|----- |-----|-----|-----|-----|----- |
|组织类型 |中国/俄罗斯 |商业公司 |网络公司 |教育机构 |政府机构 |非军事政府机构 |

## DNS是如何查找的？

1. 客户端向本地域名服务器发出请求www.github.com的IP地址
2. 本地DNS服务器会向根服务器发出请求，根服务器会告诉本地服务器（.com）的服务器地址
3. 本地DNS服务器会向（.com)发出请求，得到github.com的服务器地址
4. 然后本地DNS服务器会向github.com发出请求，得到github的ip地址，比如11.111.111.11
5. 最后本地DNS服务器向客户端回复www.github.com对应的ip地址是11.111.111.11

## 跨域的解决方案
* JSONP: 支持get，不支持post，可能造成不安全的XXS
* postMessage: 配合iframe使用，但是ie9以下不兼容
* document.domain: 仅限于同一域名下的子域
* CORS: 后台配置相关的设置，比如请求头等。
* websocke: 后台配置相关修改协议，不兼容需要用到socket.io
* proxy: 代理避开跨域，可以修改nginx或者apache的配置

## JSONP
浏览器对于script标签和img标签的src，还有link标签的ref属性都是没有同源策略限制的，所以可以利用这一点来解决跨域问题。

```js
/**
 * @desc 创建script发送，请求返回callback后删除
 */
 function myJSONP (url, params, callback) {
   return new Promise((resolve, reject) => {
     window[callback] = function (data) {
       resolve(data)
       document.body.removeChild(script)
     }
     params = {...pararm, callback}
     let arrs = []
     for (let key in params) {
       arrs.push(`${key}=${pararms[key]}`)
     }
     let script = document.createElement('script')
     script.src = url + '?' + arrs.join('&')
     document.body.appendChild(script)
   })
 }

 // usage
 myJSONP({
   url: 'http://my.test.com',
   params: {},
   callback: 'callback'
 }).then(data => {
   console.log(data)
 })
```

## postMessage
配合iframe使用，比如a.html在localhost:3000服务器，b.html在localhost:4000上

```html
<!-- a.html -->
<body>
  <iframe id="iframe" src="https://localhost:4000/b.html" frameborder="0" onload="load()"></iframe>
  <script>
    function load () {
      let iframe = document.getElementById('iframe)
      iframe.contentWindow.postMessage('测试', 'http://localhost:4000')
      window.onmessage = function (e) {
        console.log(e.data)
      }
    }
  </script>
</body>
```

```html
<!-- b.html -->
<body>
  <script>
    /**
     * @param data 消息
     * @param origin 消息来源地址
     * @param source 源DOMWindow 对象
     */
     window.onmessage = function (e) {
       console.log(e.data)
       e.source.postMessage('test2.', e.origin)
     }
  </script>
</body>
```

## documnt.domain

```html
<!-- a.html -->
<body>
  This is a.html !
  <iframe id="iframe" src="https://localhost:4000/b.html" frameborder="0" onload="load()"></iframe>
  <script>
    document.domain = 'test.com'
    function load () {
      let iframe = document.getElemntById('iframe')
      console.log(iframe.contentWindow.a)
    }
  </script>
</body>
```

```html
<!-- b.html -->
<body>
  This is b.html !
  <script>
    document.domain = 'test.com'
    var a = 'a......'
  </script>
</body>
```

## websocket
```html
<!-- 客户端 -->
<body>
  html...
  <script>
      let socket = new WebSocket('ws://localhost:3000');
      socket.onopen = function(){
          socket.send('bbbbbbb')
      }
      socket.onmessage = function(e){
          console.log(e.data)
      }
  </script>
</body>
```

```js
//  服务端
const express = require('express');
const Websocket = require('wss');
const wss= new WebSocket.Server({port:3000})
wss.on('connection', function (ws) {
  ws.on('message', function (data) {
    console.log(data)
    ws.send('test.....')
  })
})
const app = new express()
app.listen(3000)
```

## CORS

```js
const http = require('http')
const whiteUser = ['http://localhost:3000']
http.createServer = (function (req, res) => {
  let origin = req.headers.origin

  if (whiteUser.includes(origin)) { // 白名单
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','ContentType');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials',true);
    res.header('Access-Control-Allow-Expose-Headers','ContentType');
    if(req.method=== 'OPTIONS'){
      res.end()
    }
  }
}).listen(3333, function () {
  console.log(`服务启动在3333端口.`)
})
```

## Proxy
假如 test.a.com/a.html 调用了 test.b.com/api.json

```nginx
// nginx.conf
location / {
  root;
  index index.html index.htm;
}
location ~.*\.json {
  root json;
  add_header "Access-Control-Allow-Origin" "*";
}
```

## 相关概念
* 简单来说代理就是一种转发功能的应用程序，相当于中介，接受客户端发送的请求不改变请求的URI转发给服务器，同时服务器也是返回相应的内容转发啊客户端。
* 缓存代理: 代理转发的时候会先将资源缓存在代理服务器上，如果再次请求获取到相同的资源的请求时，就不会重新从源服务器请求，而是直接将缓存当作响应直接返回。
* 透明代理: 不对报文做任何加工。
* 网关是转发其他服务器通信数据的服务器，接受到客户端发送过来的请求，就让自己拥有资源服务器一样对请求进行处理，和代理差不多，但是网关能使通信线路上的服务器提供非HTTP协议的服务。
* nginx就是非常好的反向代理服务器，用来做负载均衡。通俗点讲就是我们请求的时候可能会有好多好多服务器可以响应，但是我们不知道是哪一台，所以只要知道反向代理服务器是谁就好，因为反向代理服务器会帮我们把请求转发到真实的服务器那里去。

## 最后
还需要补充的地方
* 负载均衡
* 动静分离
* TCP
* HTTP
* HTTPS