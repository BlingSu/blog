# Hash实现一个前端路由

## 由来
从前，网页是多页面的，后来由于Ajax的出现，才有了单页面SPA，但是以前的SPA有弊端:
1. 在使用的过程中，URL不会发生改变，但是如果在多个操作以后，如果不小心跳转了页面，又会回到最初的状态，相当于重新刷新了一面，这样的用户体验极其不好。
2. 缺乏路由，不易于SEO和搜索引擎的收录。

所以我们要用到<b>Hash</b>来解决这两个问题。

## Hash路由

hash满足: <i>改变URL，但是不刷新页面</i>，然后加上浏览器自带的onhashchange事件来监听，因此就能来做路由控制啦～～

```html
<ul>
  <li><a href="#/">white</a></li>
  <li><a href="#/blue">blue</a></li>
  <li><a href="#/green">green</a></li>
</ul>
```

```js
/**
 * routes 用来存放不同路由对应的回调函数
 * init 用来初始化路由，在 load 事件发生后刷新页面，并且绑定 hashchange 事件，当 hash 值改变时触发对应回调函数
*/
function Router() {
  this.routes = {}
  this.currentUrl = ''
}
Router.prototype = {
  route(path, cb) {
    this.routes[path] = cb || function() {}
  },
  refresh() {
    this.currentUrl = location.hash.slice(1) || '/'
    this.routes[this.currentUrl]()
  },
  init() {
    window.addEventListener('load', this.refresh.bind(this))
    window.addEventListener('hashchange', this.refresh.bind(this))
  }
}

const router = new Router()
router.init()

const body = document.querySelector('body')
function changeColor(color) {
  body.style.backgroundColor =color
}

router.route('/', () => { changeColor('white') })
router.route('/blue', () => { changeColor('blue') })
router.route('/green', () => { changeColor('green') })
```
在第一次进入页面的时候需要触发一下onhashchange事件，保证页面能够正常的显示，用hash在做路由的时候比较简单，很容易理解，虽然可以解决单页面应用路由控制的问题，但是加一个 <i>#</i> 总让人感觉很不输入，所有就有了<b>Histroy API</b>

## 最后
[Histroy API实现一个前端路由](https://github.com/angelasubi/blog/blob/master/md/history-router.md)


