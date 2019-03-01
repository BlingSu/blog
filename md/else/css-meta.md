# 常用meta整理

#### 概要

> 标签提供关于html文档的元数据 -- [w3school](http://www.w3school.com.cn/)
<br>

__必要属性__ 

属性 | 值 | 描述
:--- | :--- | :---
content | some text | 定义与http-equiv或name属性相关的元信息
<br>

__可选属性__

属性 | 值 | 描述 
:--- | :--- | :---
http-equiv | content-type/expire/refresh/set-cookie | 把content属性关联到http头部
name | author/description/keywords/generator/revised/others | 把content属性关联到一个名称
content | some text | 定义用于翻译content属性值的格式

<br>

#### SEO优化

* 页面关键词，每个网页都有描述该网页内容都一组唯一的关键字

```html
<meta name="keywords" content="your tags">
```

* 页面描述,每个页面都应有一个不超过150字符切能准确反映网页内容都标签

```html
<meta name="description" content="150 words">
```

* 搜索引擎索引方式
```html
<meta name="robots" content="index,follow">
<!-- 
    all: 文件将被检索，且页面上的链接可以被查询
    none: 文件不被检索，且页面上的链接不可以被查询
    index: 文件被检索
    follow: 页面上的链接可以被查询
    noindex: 文件将不被检索
    nofollow: 页面上的链接不可以被检索
 -->
```

* 页面重定向和刷新，content内的数字代表时间(秒)，多少时间刷新，url为重定向

```html
<meta http-equiv="refresh" content="0;url=">
```

* 其他

```html
<meta name="author" content="author name">
<meta name="google" content="index,follow">
<meta name="googlebot" content="index,follow">
<meta name="verify" content="index,follow">
```

#### 移动设备

* viewport 能优化移动浏览器的显示。 如果不是响应式网站，不能使用initial-scale或者缩放禁用。
* 大部分4.7-5寸设备的viewport宽设为 360px ; 
* 5.5寸设置400px; 
* iphone设为375px; 
* iphone6 plus设为414px。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<!-- `width=device-width` 会导致ip5添加主屏后webapp打开全屏模式出现黑色边框 -->
```

1. width: 宽度(数值/device-width) (范围从200~10000，默认为980px)
2. height: 高度(数值/device-width) (范围223~10000)
3. initial-scale: 初始的缩放比例 (范围从>0 到 100)
4. minimum-scale: 允许用户缩放到最小比例
5. maximum-scale: 允许用户缩放到最大比例
6. user-scalable: 用户是否可以手动缩(no, yes)

> 如果initial-scale到非响应式的网站，可以以100%宽度渲染，用户需要手动缩放，如果加个user-scalable=no 或者maximum-scale=1，就不能缩放。


* WebApp全屏模式： 伪装，离线应用。

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<!-- 启动 webapp 全屏模式 -->
```

* 隐藏状态栏/设置状态栏颜色：只有在webapp全屏有效，content的值为 default | black | black-translucent

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

* 添加到主屏后到标题

```html
<meta name="apple-mobile-web-app-title" content="标题">
```

* 忽略数字自动识别为电话号码

```html
<meta content="telephone=no" name="format-detection">
```

* 忽略识别邮箱

```html
<meta content="email=no" name="format-detection">
```

* 添加智能app广告条smart app banner：告诉浏览器网站对应的app，并且显示在banner

```html
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">
```

* 其他

```html
<!-- 针对不识别viewport的浏览器 -->
<meta name="HandheldFriendly" content="true">

<!-- 微软老是浏览器 -->
<meta name="MobileOptimized" content="320">

<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">

<!-- qq强制竖屏 -->
<meta name="x5-orientation" content="portrait">

<!-- uc强制全屏 -->
<meta name="full-screen" content="yes">

<!-- qq强制全屏 -->
<meta name="x5-fullscreen" content="true">

<!-- uc应用模式 -->
<meta name="browsermode" content="application">

<!-- qq应用模式 -->
<meta name="x5-page-mode" content="app">

```

#### 网页相关

* 申明编码

```html
<meta charset="utf-8">
```

* 优先使用ie最新版本和chrome

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<!-- 关于X-UA-Compatible -->

<meta http-equiv="X-UA-Compatible" content="IE=6">  <!-- 使用ie6  -->
<meta http-equiv="X-UA-Compatible" content="IE=7">  <!-- 使用ie7  -->
<meta http-equiv="X-UA-Compatible" content="IE=8">. <!-- 使用ie8  -->
```

* 浏览器内核控制， 大部分都是双内核控制，webkit内核高速浏览，ie内核兼容旧版网站,添加meta可以控制浏览器选择什么内核渲染

```html
<meta name="renderer" content="webkit|ie-comp|ie-stand">

<!-- 
    兼容模式(ie内核): 搜狗，QQ浏览器，
    极速模式(webkit内核): 360极速浏览器
 -->
```

* 禁止浏览器从本地计算机的缓存中访问页面内容,（无法脱机浏览）

```html
<meta http-equiv="Pragma" content="no-cache">
```
* Windows 8

```html
<!-- windows8 磁贴颜色 -->
<meta name="msapplication-TileColor" content="#000">

<!-- windows8 磁贴图标 -->
<meta name="msapplication-TileImage" content="icon.png">  
```

* 站点适配， 用于pc-手机页的对应

```html
<meta name="mobile-agent" content="format=[wml|xhtml|html5]; url=url">
<!-- format的值是手机协议语言 -->
<!-- url代表当前pc也所对应的手机也url -->
```

* 转码申明： 避免转码如下

```html
<meta http-equiv="Cache-Control" content="no-siteapp">
```


