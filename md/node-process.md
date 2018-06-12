# NodeJs process对象

> 由于项目中使用过多，故而打算了解一些常用的基础😔 <br>
> [完整版可以看看阮大神的文章](http://javascript.ruanyifeng.com/nodejs/process.html#)<br>[或者官方参考链接](https://joseoncode.com/2014/07/21/graceful-shutdown-in-node-dot-js/)

## 目录
1. 属性
2. 方法
3. process.nextTick
4. 事件

### 1. 属性
process对象提供很多属性，返回系统信息，比如:

```php
process.argv : 返回一个array，成员是当前进程的所有命令行参数

process.env : 返回一个object,成员为当前shell的环境比变量(比如是啥环境之类的)

process.installPrefix : 返回一个字符串，表示Node安装路径的前缀(／usr/local之类的)

process.pid : 返回一个数字，表示当前进程的进程号

process.platform : 返回字符串，表示当前系统(macos,linux,window...)

process.title : 返回一个字符串，默认为node，可以自定义

process.version : 返回字符串，表示当前的版本

```

#### 1.1 process.env

process.env返回一个对象，包含了当前shell的所有环境变量。比如: process.env.HOME返回用户的主目录。

一般开发过程来说，都是新建一个NODE_ENV,生产环境设置为production,开发环境为develop，然后在代码中读取process.env.NODE_ENV来获取环境适配的api。

比如可以通过命令:

```bash
$ export NODE_ENV=production && node app
// 或者
$ NODE_ENV=production node app
```


### 2. 方法
process对象提供如下方法:

```php
process.chdir() : 切换工作目录到指定目录

process.cwd() : 返回当前运行的工作目录路径

process.exit() : 退出当前进程

process.getgid() : 返回当前进程的组id

process.getuid() : 返回当前进程的用户id 

process.nextTick() : 指定callback在当前执行栈尾部，下一次event loop 之前执行

process.on() : 监听事件

process.setgid() : 指定当前进程的组， 可以用数字或者字符串id

process.setuid() : 指定当前进程的用户， 可以用数字或者字符串id
```

#### 2.1 process.cwd(), process.chdir()

cwd 方法 返回进程的当前目录(绝对路径)，chdir() 用来切换目录

```bash
// 首先进入node环境
> process.cwd()
> '/user/aaa'

> process.chdir('/user/bbb')
> process.cwd()
> '/home/bbb'
```

process.cwd() 与 __dirame 的区别.
process.cwd()是进程发起时候的位置，__dirname是脚本的位置，可能会不一致。<br>
比如:
```
node ./code/program.js 对于cwd来说返回当前目录   (.)
对于dirname来说，返回脚本所在目录 ./code/program.js
```

### 3. process.nextTick()
process.nextTick把任务放到当前一轮的event loop的尾部。
```js
process.nextTick(function() {
  console.log('下次 event loop 马上开始')
})

setTimeout(() => {
  console.log('已经到了下一次event loop')
}, 0)
```
顺序如下:
1. setTimeout(fn, 0)
2. 其他乱七八糟的callback
3. process.nextTick


#### 3.1 process.exit()
process.exit 用来退出当前进程，接受的参数如果大于0，则为失败，等于0为成功。


```js

// 最简单的是这样
if (err) {
  process.exit(1)
} else {
  process.exit(0)
}

// 安全点的办法
function printUsageStdout() {
  process.stdout.write(`...some log text...`)
}
if (true) {
    printUsageStdout()
    process.exitCode = 1
    throw new Error(`xx bug ~~~`)
}
// process.exit() 执行会触发exit事件
```

#### 3.2 process.on()
process对象部署了EventEmitter，所以可以用on来监听事件。

```js
process.on('uncaughtException', function(err) {
  console.error('error: %s', err.message)
  process.exit(1)
})

setTimeout(() => {
  throw new Error(`fail`)
}, 100)

// process监听node 全局事件 uncaughtException，如果错误没捕获到就会触发
```

process 支持事件
> data事件：数据输出输入时触发
> SIGINT事件：接收到系统信号SIGINT触发，比如ctrl+c的时候
> SIGTERM事件：系统发出进程终止信号SIGTERM触发
> exit事件：进程退出前触发


### 4. exit事件

当前进程退出后会触发exit事件，并且指定callback

```js
process.on('exit', code => {
  setTimeout(() => {
    console.log('no run')
  }, 0)
})
// cb只能同步，不能异步，cb执行结束后会exit，无法监听到cb的结果
```
