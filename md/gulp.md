# Gulp 前端自动化构建

## 起步
安装gulp
```js
// 全局
npm i -g gulp
// 项目中
npm i --save-dev gulp
```
初始化项目
```js
npm init
```
生成package.json配置文件

## 搭建工程
项目目录如下：
```js
-------------------project
|   |
|   |--------------dist (该文件夹为打包生成的)
|   |   |
|   |   |----------css
|   |   |   |
|   |   |   |------index.css
|   |   |
|   |   |----------js
|   |   |   |
|   |   |   |------index.js
|   |   |----------index.html 
|   |
|   |--------------src
|   |   |
|   |   |----------scss
|   |   |   |------index.scss
|   |   |
|   |   |----------js
|   |   |   |
|   |   |   |------index.js
|   |   |----------image
|   |   |   |
|   |   |   |------logo.png
|   |   |   |------sprite
|   |   |
|   |   |----------index.html
|   |--------------gulpfile.js
|   |--------------package.json
```

## 流程
### 文件编译
> 如果是用scss作为css预编译，利用gulp对scss进行编译，所以要装gulp-sass

```js
npm i --save-dev gulp-sass
```
安装完成后在gulpfile.js里面饮入配置使用
```js
const sass = require('gulp-sass')

gulp.task('sass:dev', ()=> {
  return gulp.src('src/scss/*.scss')   //需要编译的路径
  .pipe(sass())
  .pipe(gulp.dest('dist/css')) //编译好的生成到dist/css文件下
})
```

> 如果是用less作为css预编译，利用gulp对scss进行编译，则要装gulp-less

```js
npm i --save-dev gulp-less
```
配置:
```js
const less = require('gulp-less')

gulp.task('less', function() {
  return gulp.src('../src/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'))
});
```

> image图片压缩处理，需要装gulp-imagemin,缓存cache

```js
npm i --save-dev gulp-imagemin gulp-cache
```
配置:
```js
const less = require('gulp-imagemin')

gulp.tash('imagemin', function() {
  return gulp.src('../src/image/*.{png,jpg,gif,ico}') //映射文件
    .pipe(cache(imagemin({
            optimizationLevel:5, //类型：Number 默认：3 取值范围：0-7（优化等级）
            progressive:true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced:true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass:true. //类型：Boolean 默认：false 多次优化svg知道完全优化
        })))
        .pipe(gulp.dest('dist/img')) // 输出目录
})
```
> js文件压缩合并处理,需要gulp-uglify压缩, gulp-concat 合并

```js
npm i --save-dev gulp-uglify gulp-concat
```
配置:
```js
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

//单个js文件
gulp.task('jsmin', function() {
    return gulp.src('../src/js/index.js')
        .pipe(uglify())
        .pipe(gulp.dest('../dist/js'))
    })

//多个js压缩 并且合并
gulp.task('jsconcat', function() {
    return gulp.src(['../src/js/index.js','../src/js/index2.js'])
    .pipe(concat('index.min.js')) //合并输出
    .pipe(uglify())     // 压缩
    .pipe(gulp.dest('../dist/js'))
    })
```

> 自动化雪碧图,需要gulp.spritesmith

```js
npm i --save-dev gulp.spritesmith
```

配置:
```js
const spritesmith = require('gulp.spritesmith')

gulp.tash('sprite', function() {
    gulp.src('../src/image/sprite/*')
    .pipe(spritesmith({
        padding: 4, //间距
        imgName: 'icon.png', //输出名字
        cssName: '../css/icon.css', //输出路径
        algorithm: 'binary-tree' // 排列方式 默认即可 
        //cssFormat: 'scss',//scss格式输出
        //cssTemplate: 'scss.handlebars'//模板文件（相对于gulpfile的位置）
        }))
    })
```

> css压缩任务处理, 需要gulp-clean-css

```js
npm i --save-dev gulp-clean-css
```

配置:

```js
const cssmin = require('gulp-clean-css')
// 给css加版本号
const cssver = require('gulp-make-css-url-version')

gulp.task('cssmin', function() {
    gulp.src('../src/css/*')
    //.pipe(cssver()) //给css文件里引用文件加版本号
    .pipe(cssmin({
        advanced: false, //是否开启高级优化(合并选择器等)
        compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
        keepBreaks: true, //是否保留换行
        keepSpecialComments: '*' //保留特殊前缀
        }))
        .pipe(gulp.dest('../dist/css'))
    })
```

> 设置默认配置任务

```js
//默认命令 配置如下
gulp.task('default', function() {
    gulp.watch('../src/image/*.{png,jpg,gif,ico}', function(){
        gulp.run('imagemin')
        })
    })
    gulp.watch('../src/css/*.css', function(){
        gulp.run('cssmin')
    })
    gulp.watch('../src/js/*.js', function(){
        gulp.run('jsconcat')
    })
    // ...随意配置
```

## 总结
只是列出一些比较简单的常用的模块，慢慢来～～～

