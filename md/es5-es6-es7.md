# JavaScript features in es5,es6,es7

## 块级作用域
> let 

```js
function fn() {
    let x = 0
    if (true) {
        let x = 1 
        // x = 1 only inside if
    }
}
```

> const

```js
const a = 1
```

## 反引号字符串

> 插入文字

```js
var message = `Hello ${name}`
```

> 多个字符串

```js
var str = `Hello wrold`
```


## 新方法

> 字符串方法

```js
"Hello".repeat(3)
"Hello".includes('ll')
```

## 类

```js
class Circle extends Shape {
    // constructor
    constructor (radius) {
        this.radius = radius
    }

    // methods
    getArea () {
        return Math.PI * 2 * this.radius
    }

    // calling superclass methods
    expand (n) {
        return super.expand(n) * Math.PI
    }

    // static methods
    static createFromDiameter (diameter) {
        return new Circle(diameter / 2)
    }
}

```

## Promises

> Making promises

```js
new Promise((resolve, reject) => {
    if (yes) { resolve(result) }
    else { reject(error) }
    })
```

> Using promises

```js
promise
    .then((res) => { console.log(res) })
    .catch((err) => { conosle.error(err) })
```

> Promise functions

```js
Promise.all()
Promise.race()
Promise.reject()
Promise.resolve()
```

> Async-await

```js
async function people () {
    const user = await getUser()
    const grils = await.getGril(user)
    return [user, grils]
}
```

## 解构

> 解构分配

```js
// Array
var [first, last] = ['man', 'gril']

// Objects
let {gril, coolMan} = {
    gril: 'beautify gril',
    coolMan: 'me'
}
```

> Default values

```js
var a = [22, 33]
var [a = 50, b = 55, c = 50] = a

// result:
// a === 22 b === 33 c === 50
```

> Function arguments

```js
function greet({name, greeting}) {
    console.log(`${name}, ${gretting}`)
}

greet({name: 'me', gretting: 'beautifyGril'})

// or
function printCoordinates({ left: x, top: y }) {
    console.log(`x: ${x}, y: ${y}`)
}
printCoordinates({ left: 25, top: 90 })
```

> 循环

```js
for (let {title, artist} in songs) {
    // ...
}
```

## 对象传播

> Object spread

```js
// with object spread
const options = {
    ...defaults,
    visible: true
}

// without object spread
const options = Object.assign({}, defaults, {visible: true})
```

> 数组传播

```js

// with Array spread
const users = [
    ...admins,
    ...editors,
    'gril'
]

// without Array spread
const users = admins.concat(editors).concat(['gril'])
```


## Objects

> Shorthand syntax

```js
module.exports = { hello, bye }
```


> Methods

```js
const App = {
    start () {
        console.log(`running`)
    }
}
```

> Getters and Setters

```js
const App = {
    get closed () {
        return this.status = 'closed'
    },
    set closed () {
        this.status = value ? 'closed' : 'open'
    }
}
```

> Computed property names

```js
let event = 'click'
let handlers = {
    [`on${event}`]: true
}
```

## Modules

> imports

```js
import 'helpers'

import Koa from 'koa'

import { indent } from 'helpers'

import * as indent from 'helpers'

import { indentSpace as indent } from 'helpers'
```

> Exports

```js
export default function () {...}

export function myFunction () {...}

export const pi = 3.14
```
