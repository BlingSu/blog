# Nginx和前端开发

## Nginx和Node.js

> "nginx"是一款轻量级的HTTP服务器，采用事件驱动异步非阻塞处理方式框架，使其拥有极好的IO性能，经常用于反向代理或者负载均衡。"

在工作中，由于一些特殊的原因，对于前端来说，最快最便捷的就是用Nodejs来搭建服务器，对Nginx有一定的抗拒。不过Nginx中的大部分功能和Nodejs是不冲突的。Nginx更加适用于底层服务端资源的处理，比如静态资源处理转发，反向代理，负载均衡等。而Nodejs更直接的用于具体业务逻辑的处理。所以两者如何配合起来，能够更方便的开发和处理一些问题。

## 正向代理
客户端（找到代理向服务方发起请求）向服务方发起请求，这种情况就是<code>正向代理</code>。正向代理主要用于科学上网。  
简单点说: 客户端和代理服务器可以直接互相访问，属于一个局域网。也就是说用户的操作被发送到代理服务器，代理服务器通过代理用户端的请求向域外的服务器请求响应内容。

## 反向代理
客户端发送请求（被发送到一个代理服务器proxy），这个代理服务器把请求代理到和自己属于同一个局域网的内部服务器上，用户需要的响应内容就在这些内部服务器上。  

简单点说: 代理服务器和真正的服务器可以互相访问，属于一个局域网。不管加不加这个反向代理，用户都是通过相同的请求进行访问。代理服务器通过代理内部服务器接受域外客户端的请求，并将请求发送到对应的内部服务器上。  

### 为什么要用Nginx
<strong>* 安全、权限</strong>   
假设使用的反向代理，那么用户将无法直接通过请求来访问真正的服务器，而是必须先通过Nginx，然而我们可以通过Nginx层将危险或者没有全县的请求内容过滤掉，这样可以保证真正服务器的安全。  
<strong>* 负载均衡</strong>    
假设一个网站的内容被部署到了若干台服务器上，这样Nginx可以将接收到的客户端请求分别分配到这堆服务器上，通过负载均衡算法，实现服务器压力的负载均衡。并且Nginx还会定期来检查是否有服务器存在异常，如果发现某一台异常的话，那么代理进来的用户请求都不会被发送到这台有异常的服务器上，这样可以保证用户端访问的稳定性。

## 常用的Nginx能做的事情
<strong>1. 控制访问来源</strong>   
比如只让公司内网访问或者是让某个uri不让访问之类的。
```nginx
  location / {
    deny  192.168.1.1;
    allow 192.168.1.0/24;
    allow 10.1.1.0/16;
    allow 2001:0db8::/32;
    deny  all;
  }
```
deny和alow是[ngx_http_access_module](http://nginx.org/en/docs/http/ngx_http_access_module.html)中的语法。简单说就是按顺序检查规则，直到匹配为止。在这里，只允许ipv4网络<code>10.1.1.0/16</code>和<code>192.168.1.0/24</code>（不包括<code>192.168.1.0</code>）和ipv6<code>2001:0db8::/32;</code>进行访问，其他全部禁止访问。

<strong>2. 解决跨域</strong>
> 在这里有一个具体解决跨域的[demo](http://www.baidu.com)
在前后端分离调试的时候可以本地直接访问远程接口会造成跨域问题。不过现在一般是通过Node和proxy集成进来解决。只是如果用Nginx的话同样可以解决问题，甚至可以用于生产环境。假设现在本地启动一个Nginx服务，server_name是test-nginx.com，那么如果请求某个线上的接口，浏览器实惠报错的，比如`No 'Access-Control-Allow-origin' header is present on the requested resource`之类的。那么就需要绕开浏览器的跨域限制，我们跨域将域名改成<code>test-nginx.com</code>。同时约定一个url规则来表明代理请求的身份，最后通过Nginx匹配这个规则，将请求代理回原来的域。

```nginx
# 约定path必须以/proxy/开头
location ^~/proxy/ {
  # 重写地址，匹配第一个()中$1的path，拼到后面
  rewrite ^/proxy/(.*)$ /$1 break;
  proxy_pass: http://www.baidu.com/;
}
```

<strong>3. 适配PC和Mobil环境</strong>  

按目前市场来看，基本上每个公司每个网站都是有PC端和H5端两个站点。所以可以通过Nginx内置的$Http_user_agent来获取客户端的userAgent，从而知道用户是处于移动端环境还是PC环境下，这样就可以重定向到对应的站。假设这里有两个站点 `test.com`和`test-h5.com`，那么Nginx可以像下面这么配置：

```nginx
location / {
  if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
    set $mobile_type '1';
  }
  if ($mobile_type == '1') {
    rewrite ^.+ http://test.h5.com;
  }
}
```
