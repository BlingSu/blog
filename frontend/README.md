# 前端面试总结
> 涉及不全，仅供参考

## 目录
* HTML
* CSS/CSS3
* Javascript
  - [Javascript数据类型](#31-数据类型)
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
### 四、 Http
