# 发现11个骚气的CSS属性

> 由于一些属性在某些浏览器中不起作用，可以使用<code>@supports</code>检查浏览器支持并且相应的添加`fallback`

## 1. <code>box-decoration-break</code>

[box-decoration-break](https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break)的意思就是指定在跨多行，每列或多个页面的时候呈现元素的片段。

#### HTML
```html
<h1>
  <span>what can I do for you !</span>
</h1>
```

#### CSS
```css
h1 {
  max-width: 300px;
}
h1 span {
  background: blue;
  color: #fff;
  padding: 12px;
  line-height: 1.4;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone
}
body {
  margn: 0;
  display: flex;
  justify-contet: center;
  align-items: center;
}
```

## 2. <code>attr</code>

[attr()](https://developer.mozilla.org/en-US/docs/Web/CSS/attr)是一个css函数，用于检索所选的属性值，并且在样式表中使用。当然也可以用在伪元素中，返回伪元素的原始元素的属性址。

#### HTML
```html
<div>
  On Today, I <span aria-label="I want sleeping !!! hahahahaha">emmmm!</span>
</div>
```

#### CSS
```css
span {
  position: relative;
  color: blue;
  cursor: pointer;
}
span:hover:before {
  opacity: 1;
}
span:before {
  content: attr(aria-label);
  opacity: 0;
  position: absolute;
  top: 30px;
  right: -90px;
  font-size: 14px;
  width: 100px;
  padding: 10px;
  color: #fff;
  background-color: #555;
  border-radius: 3px;
  pointer-events: none;
}
div {
  padding: 40px;
  font-size: 20px;
}
```

## 3. <code>backface-visibility</code>
[backface-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility)属性在转向用户时元素的背面是否可见。

#### HTML
```html
<div class="card">
  <div class="card-inner">
    <div class="card-front">
      <h3>哈哈哈</h3>
    </div>
    <div class="card-back">
      <h3>嘻嘻嘻</h3>
    </div>
  </div>
</div>
```

#### CSS
```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.card {
  background-color: transparent;
  width: 300px;
  height: 300px;
  perspective: 1000px;
}
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.card-focus {
  outline: 0;
}
.card:hover .card-inner,
.card-focus .card-inner {
  transform: rotateY(180deg);
}
.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
.card-front {
  background: linear-gradient(to left, #4364f7, #6fb1fc);
  color: #333;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-back {
  background: linear-gradient(to right, #4364f7, #6fb1fc);
  color: #fff;
  transform: rotateY(180deg);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
h3 {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
```

## 4. <code>conic-gradient</code>

[conic-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient)渐遍可以使用线性渐变来设置背景样式，也可以在纯css下在圆锥渐变下创建饼图。

#### HTML

```html
<div class="pie-chart"></div>
```

#### CSS

```css
.pie-chart {
  width: 300px;
  height: 300px;
  background: conic-gradient(#8b22ff 0% 25%, #ffc33b 25% 56%, #21f3d6 56% 100%);
  border-radius: 50%;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```


## 5. <code>filter</code>

[filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)将模糊或颜色偏移等图形效果应用于元素

#### HTML

```html
<div>
  <h1>Origin Image:</h1>
  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560164614955&di=87e74d40d19b39e7fe3625439f0b5813&imgtype=0&src=http%3A%2F%2Fimg3.iqilu.com%2Fdata%2Fattachment%2Fforum%2F201304%2F11%2F111216lztdjx83xagz0ca0.jpg" alt="">
  <h1>Filtered Images:</h1>
  <div class="filter1">
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560164614955&di=87e74d40d19b39e7fe3625439f0b5813&imgtype=0&src=http%3A%2F%2Fimg3.iqilu.com%2Fdata%2Fattachment%2Fforum%2F201304%2F11%2F111216lztdjx83xagz0ca0.jpg" alt="">
  </div>
  <div class="filter2">
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560164614955&di=87e74d40d19b39e7fe3625439f0b5813&imgtype=0&src=http%3A%2F%2Fimg3.iqilu.com%2Fdata%2Fattachment%2Fforum%2F201304%2F11%2F111216lztdjx83xagz0ca0.jpg" alt="">
  </div>
  <div class="filter3">
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560164614955&di=87e74d40d19b39e7fe3625439f0b5813&imgtype=0&src=http%3A%2F%2Fimg3.iqilu.com%2Fdata%2Fattachment%2Fforum%2F201304%2F11%2F111216lztdjx83xagz0ca0.jpg" alt="">
  </div>
</div>
```

#### CSS

```css
img {
  width: 500px;
  margin-bottom: 20px;
}
.filter1 img {
  filter: grayscale(90%) sepia(13%) saturate(700%);
}
.filter2 img {
  filter: hue-rotate(-40deg);
}
.filter3 img {
  filter: contrast(170%) saturate(80%) blur(1px);
}
```

<code>drop-shadow</code>可以对图片阴影处理，比如:

```css
img {
  filter: drop-shadow(0px 0px 5px magenta);
}
```


