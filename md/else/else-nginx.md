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
<strong>* 安全和权限</strong>   
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
> 在这里有一个具体解决跨域的[demo](https://github.com/angelasubi/nginx-proxy-demo)    

在前后端分离调试的时候可以本地直接访问远程接口会造成跨域问题。不过现在一般是通过Node和proxy集成进来解决。只是如果用Nginx的话同样可以解决问题，甚至可以用于生产环境。假设现在本地启动一个Nginx服务，server_name是test-nginx.com，那么如果请求某个线上的接口，浏览器实惠报错的，比如`No 'Access-Control-Allow-origin' header is present on the requested resource`之类的。那么就需要绕开浏览器的跨域限制，我们跨域将域名改成<code>test-nginx.com</code>。同时约定一个url规则来表明代理请求的身份，最后通过Nginx匹配这个规则，将请求代理回原来的域。

```nginx
# 约定path必须以/proxy/开头
location ^~/proxy/ {
  # 重写地址，匹配第一个()中$1的path，拼到后面
  rewrite ^/proxy/(.*)$ /$1 break;
  proxy_pass: http://www.baidu.com/;
}
```

<strong>3. 适配PC和Mobile环境</strong>  

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

<strong>4. 合并请求</strong>  
通过淘宝写的[nginx-http-concat](https://github.com/alibaba/nginx-http-concat)模块可以尽量的减少http资源请求的数量。在这里可以用一个特殊的请求url规则，将前端的多个资源请求合并到一个请求，这样可以减少浏览器开销。假设以`test.com`为例，有`a.js,b.js,c.js`三个文件，Nginx配置如下:

```nginx
location / {
  concat on;  # 是否开打开资源合并开关
  concat_types application/javascript; # 合并资源类型
  concat_unique off; # 不允许合并不同类型的资源
  concat_max_files 5; # 允许合并最大资源数目
}
```

所以当访问`http://test.com/??a.js,b.js,c.js`时就会发现三个js的内容被合并成一个返回了。

<strong>5. 图片处理</strong>  
以目前前端开发来看，经常会用到很多不同尺寸的图片。相对来说，现在大部分都是把图片传到七牛云，然后七牛云有对应的文档配置参数可以处理图片。不过，如果使用Nginx，也可以搭建一个属于自己本地的图片处理服务，完全可以满足日常的需求，当然要借助[ngx_http_image_filter_module](http://nginx.org/en/docs/http/ngx_http_image_filter_module.html)这个模块。假设要实现一个图片控制大小的功能的话可以这么做：

```nginx
location ~* /img/(.+)$ {
  set $width -;
  set $height -;
  if ($arg_width != "") {
    set $width #arg_width;
  }
  if ($arg_height != "") {
    set $height #arg_height;
  }
  iamge_filter resize $width $height;
  error_page 415 err.png;
}
```

上面是基本的配置，当然还可以设置最大buffer，interlace开启图像隔行扫描，proxy_cache配置Nginx缓存，减少Nginx服务器压力之类的。

<strong>6. 多环境处理</strong>  

在正常开发中，一般会区分多个环境，比如`test1，test2，online`三个环境。其实可以通过Nginx和反向代理来轻松切换环境。简单来说就是写一个js文件和一个css文件，其中这个js文件包含了点击触发将点击具体的host的ip和hostname缓存到cookie中，然后这个css的话就是对应的这个点击列表的样式。再者需要两个模块，首先是[ngx_http_addition_module ](http://nginx.org/en/docs/http/ngx_http_addition_module.html)这个模块来追加我们写的js和css，然后还需要一个淘宝写的用于底部展示验证的模块[nginx-http-footer-filter](https://github.com/alibaba/nginx-http-footer-filter)。简单Nginx的配置大概是这样: 

```nginx
server {
  server_name nginx.test.com;
  set $root /Users/angelasubi/Desktop/server;
  charset utf-8;

  # 设置默认host
  set $switch_host '1.2.3.4';
  # 设置默认hostname
  set $switch_hostname '';
  # 从cookie中拿ip
  if ($http_cookie ~* "switch_host=(.+?)(?=;|$)") {
    set $switch_host $1
  }
  # 从cookie中拿hostname
  if ($http_cookie ~* "switch_hostname=(.+?)(?=;|$)") {
    set $switch_hostname $1
  }

  location / {
    proxy_set_header Host $host;
    # 去除gizip
    proxy_set_header Accept-Encoding '';
    # 代理到真实ip
    proxy_pass http://$switch_host:80;
    sub_filter_once off;
    # 追加内容
    sub_filter '</head>' </head><link rel="stylesheet" type="text/css" media="screen" href="/local/my.css" />';
    sub_filter 'title_name' 'title_name:${switch_hostname}'
    # 插入js
    set $injected '<script src="/my.js"></script>'
    # 展示
    footer '${injected}'
  }

  # 对于自my.js和my.css 假设在my文件中 优先匹配本地
  location ^~ /my/ {
    root $root;
  }
}
```


## 最后

文中只是相对性的提到一点最最最常用的，当然还有许多需要学习的，想知道具体有哪些东西，可以看[官网](http://nginx.org/en/docs/)