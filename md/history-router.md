# History实现一个前端路由

history也是HTML5新增的API，可以实现无刷新的更改地址栏链接。

## 在浏览器的历史记录中切换

```js
window.history.back() // 后退一页
window.history.forward() // 前进一页
window.history.go(-2) // 后退两页，当前索引为0
```

## pushState()和replaceState()

这两个方法用来创建新的history状态和改变history状态  

pushState()接受三个参数:  
1. stateObj, 一个普通的js对象，可以包含在新的history实体的state属性中。当导航切换刀这个状态的时候，一个<i>popstate</i>事件将会被触发，并且在这个事件的e.state中会包含这个stateObj。
2. title，表示一个新的history状态的字符串，可以传空。
3. URL，可选参数，将改变浏览器当前的URL，但是新的URL不会立刻家在。当跳转到另外一个页面，然后在点击后退，这个URL就会加载，并且触发popstate事件。

```js
// url: http://www.github.com

history.pushState({name: 'angelasubi', age: '23'}, '', '/angelasubi')
// 这个时候浏览器地址会变成 http://www.github.com/angelasubi，history的state会传入stateObj.length加一
// 当我们在地址栏输入一个新的地址以后再回退回来就会跳到http://www.github.com/angelasubi 而不是. http://www.github.com
// 在这个时候同时触发popstate事件，刚才的stateObj会存在state中
```

replaceState()和pushState()基本是一样的，只不过replaceState()只是更改当前history状态，并不会创建，通常用来改变当前history的state和URL，而不刷新页面。  

pushState类似于 <i>window.location="#angelasubi"</i>，因为都是创建并且激活一个history实体，不过pushState()优点更多一点: 
1. 新的URL可以是任何URL，而location只能是当前的document。
2. 可以在新的history状态通过state属性挂载任何对象，而hash不行。
3. 可以添加一个history状态而不改变URL(将URL属性置空)，而hash必定造成URL变化。

## popstate事件

这个事件是触发一个浏览器行为，比如前进或者后退。所以pushState()或者replaceState()并不会触发popstate事件。

```js
window.onpopstate = function(e) {
  console.log(e)
}
// 当触发前进或者后退的时候就会触发这个事件看到console的值

```

## 实现一个简单的路由

思路: 
> 相对来说，URL的改变（不包括 hash 值的改变）只能由下面三种情况引起: 
1. 前进，后退
2. a标签
3. JS代码触发<i>history.push(replace)State</i>函数

所以，只要拦截上面三种情况，就可以监听到history的改变，可以用根据onpopstate来监听前进后退。

```js
class Router {
  constructor() {
    this.routes = {}
    this.currentUrl = ''
  }
  route(path, cb) {
    this.routes[path] = cb || function() {}
  }
  update(url) {
    this.currentUrl = url
    this.routes[this.currentUrl] && this.routes[this.currentUrl]()
  }
  _bindLink() {
    const links = document.querySelectorAll(`a[data-href]`)
    for (let i = 0; len = links.length; i < len; i++) {
      const current = links[i]
      current.addEventListener('click', e => {
        e.preventDefault()
        const url = current.getAttribute('data-href')
        history.pusState({}, null, url)
        this.update(url)
      }, false)
    }
  }
  init() {
    this._bindLink()
    window.addEventListener('popstate', e => {
      this.update(window.location.pathname)
    })
    window.addEventListener('load', () => this.update('/'), false)
  }
}
```
init初始化函数，首先需要获取所有特殊的链接标签，然后监听点击事件，并且阻止默认事件，触发history.pushState更新响应的视图。绑定popstate事件，在点击和后退的时候，能够即使更新视图。刚进去页面的时候也要更新视图。

```html
<div id="app">
  <ul>
    <li><a data-href="/" href="#">first</a></li>
    <li><a data-href="/second" href="#">second</a></li>
    <li><a data-href="/three" href="#">threee</a></li>
  </ul>
  <div id="content"></div>
</div>

<script>
  const router = new Router()
  router.init()
  router.route('/', () => {
    document.querySelector('#content').innerHTML = 'first'
  })
  router.route('/second', () => {
    document.querySelector('#content').innerHTML = 'second'
  })
  router.route('/three', () => {
    document.querySelector('#content').innerHTML = 'three'
  })
</script>
```

## 总结
通常点击页面a链接，页面会刷新跳转，所以需要监听页面所有a链接点击事件，并阻止默认事件, 然后调用 history.pushState() 方法来实现路由切换。  
当活动历史记录条目更改时，将触发 popstate 事件, 需要注意的是，调用 history.pushState() 和 history.replaceState() 不会触发 popstate 事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退/前进按钮。

## 参考
[History API](https://developer.mozilla.org/en-US/docs/Web/API/History)