# 关于如何实现图片懒加载

## 懒加载

在做开发的时候，我们通常会用到图片，对于页面来说，影响速度是最大的就是图片，因为一张图片的大小可以从几十KB到几MB，当图片很多的时候，页面的加载速度就会变的很慢，很长的时间过后页面还没加载完。

所以，对于图片过多的页面，为了加快页面的加载速度，我们需要在还没有呈现出的可视区域内的图片暂时不做加载，等到滚动到可视区域的时候再去加载对应的图片，性能就会大大提升，同时提高了用户体验。

## 原理

将页面中的img标签的src属性指向一个小图片(可以理解为占位符)或者src为空，然后定义一个属性指向真实的图片，比如data-src。src默认指向一个图片，要不然src为空还是会发送一个请求。
> 图片一定要定！宽！高！

当页面加载的时候，先把可视区域内的img标签的data-src属性值负给src，然后监听滚动事件，把用户即将看到的图片加载，这样便实现了懒加载。

## 如何判断元素是否在可视区域

### 方法一
1. 通过 document.documentElement.clientHeight 获取屏幕可视窗口高度
2. 通过 element.offsetTop 获取元素相对于文档顶部的距离
3. 通过 document.documentElement.scrollTop 获取浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离
4. 然后判断2和3

### 方法二
通过 getBoundingClientRect() 方法来获取元素的大小以及位置。这个方法返回一个名为ClientRect的DOMRect对象，包含了bottom、height、left、right、top、width、x、y这些值。 

> 在什么情况下图片可以进入可视区域？ 

假设 const bound = el.getBoundingClientRect() 来表示图片到可视区域顶部距离；
const clientHeight = window.innerHeight 来表示可视区域的高度。  

随着滚动条慢慢像下滚动，bound.top就会越来越小，当bound.top === clientHeight的时候，就是图片的最上面在可视区域的最下面，如果再上移动一点点，那么图片就进入可视区域了
。
```js
function isShow(el) {
  const bound = el.getBoundingClientRect
  const clientHeight = window.innerHeight || document.documentElement.clientHeight // 只考虑向下滚动加载
  return bound.bottom >= 0 && bound.top < clientHeight
}
```

## 如何加载图片

在页面打开的时候要对所有的图片进行检查，如果在可视区域内，那么就要加载。

```js
let index = 0
function checkImgs() {
  const imgs = document.querySelectorAll('phtot')
  for (let i = index; i < imgs.length; i++) {
    if (isShow(imgs[i])) {
      loadImg(imgs[i])
      index = i
    }
  }
}

function loadImg(el) {
  let img = new Image()
  img.onload = () => {
    el.src = img.src
  }
  img.src = el.dataset.src
  el.dataset.src = ''
}
```

## 函数节流

简单来说，就是让一个函数不要执行的台频繁，减少一些过快的调用来节流。
> 在这里相当于滚动快的时候就会产生这个问题

基本步骤:
1. 获取第一次触发事件的时间戳
2. 获取第二次触发事件的时间戳
3. 如果两个时间差大于某个阀值的时候，就重置第一个时间

```js
function throttle(fn, delay, time) {
  let timeout,
      startTime = new Date()
  return function() {
    let context = this,
        args = arguments,
        currentTime = new Date()
    clearTimeout(timeout)

    if (currentTime - startTime >= time) {
      fn.apply(context, args)
      startTime = currentTime
    } else {
      timeout = setTimeout(fn, apply)
    }
  }
}
```

## 调用方法

```js
window.onload = checkImgs
window.onscroll = throttle(checkImgs, 500, 500)
```

## 总结

总的来说，就是在可视区域的时候才加载图片，防止一次性全部加载造成加载速度缓慢，网页卡的问题。特别要注意的是，图片一定要定宽高！！！