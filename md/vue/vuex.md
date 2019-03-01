# vuex 学习总结

vuex就是使用一个store对象来包含所有的应用层级状态，也就是数据的来源。如果数据较为庞大，可以将store模块化，如下：

```js
const moduleA = {
    state: { ... },
    mutations: { ... },
    acitions: { ... },
    getters: { ... }
}

const moduleB = {
    state: { ... },
    mutations: { ... },
    actions: { ... }
}

const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
})

store.state.a // -> moduleA的状态
store.state.b // -> module\B的状态
```

## State
state 其实就是存放变量，相当于状态。跟data是类似的，如果没有state的时候一般是获取data里的来操作，如果有了state，就可以把data转移到state上。如果一个组件有很多状态需要获取，就可以用mapState辅助函数帮忙计算，如下：

```js
import { mapState } from 'vuex'

export default {
    // ...
    computed: mapState({
        count: state => state.count,
        countAlias: 'count',
        countPlusLocalState (state) {
            return state.count + this.localCount
        }
    })
}
```
简单来说就是把state上保存的变量转移到计算属性上。当映射的计算属性的名称与state的子节点名称相同的时候，可以给mapState传一个字符串数组
```js
computed: mapState(['count'])
```

## Getters
getters 相当于存放一些公共函数给组件调用。getters暴露为store.getters对象，这样就可以调用了 。mapGetters辅助函数仅仅是将store中的getters映射到局部计算属性。相当于从getters中获取相应的属性。

```js
computed: {
    ...mapGetters(['newOrOld'])
}
// getters are functions
const getters = {
    newOrOld: state => state.count % 2 === 0 ？ 'new' : 'old'
}
```
可以将getters中的newOrOld属性值传给对应组件中的newOrOld上。Getters接受state作为其第一个参数，也可以接受其他作为第二个。

## Mutations
mutations 与事件类似，更改vuex的store中的唯一方法是提交mutation。故而mutations上存放的就是改变state的方法。

```js
const store = new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        increment (state) {
            // 更改状态
            state.count++
        }
    }
})
```
在这里不能直接调用mutation，有点像 "触发一个类型为increment的mutation时，调用这个函数"，需要以相应的type调用store.commit方法:
```js
store.commit({'increment'})
```

如果mutation事件较多的时候，可以用常量代替mutation事件类型。然后放到单独的文件，可以更加清晰。
```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } form './mutation-types'

const store = new Vuex.Store({
    state: { ... },
    mutations: {
        // es2015 将常量作为函数名
        [SOME_MUTATION] (state) {
            // mutate state
        }
    }
})
// 注: mutation 必须是同步函数
```

## Actions
mutations像是注册事件，需要相应的触发条件，然而Actions就是管理触发条件的。Action类似于mutation，但是action提交的是mutation，而不是直接更改状态，action可以直接包含任意的异步操作。

```js
actions: {
    increment (types) {
        types.commit('increment')
    }
}
```
Action 函数接受一个和store实例相同的方法和属性的types对象,所以可以types.commit提交一个mutation,或者通过types.state和types.getters来获取state和getters,可以通过解构来优化:

```js
actions: {
    increment ({commit}) {
        commit('increment')
    }
}
```
所以如果说mutation事件类型的话，就要指定某个动作来触发这个事件，这样就是分发action，通过store.dispatch方法来触发。

```js
store.dispatch('increment')
```
此外，可以在action内部执行异步操作

```js
actions: {
    incrementAsync ({commit}) {
        setTimeout(() => {
            commit('increment')
            }, 1000)
    }
}
```
组件中可食用this.$store.dispatch('xxx') 分发action，或者使用mapActions辅助函数将组件的methods映射为store.dispatch调用

```js
import { mapActions } from 'vuex'
export default {
    // ...
    methods: {
        ...mapActions([
                'increment' //映射this.increment() 为 this.$store.dispatch('increment')
            ]),
        ...mapActions([
                add: 'increment' // 映射this.add() 为this.$store.dispatch('increment')
            ])
    }
}
```

当使用了mapActions，就不需要使用this.$store.dispatch('xxx')， 如果没使用的话，可以手动分发:

```js
methods: {
    save() {
        const plan = {
            date: this.date,
            totalTime: this.totalTime,
            comment: this.comment
        }
        this.$store.dispatch('savePlan', plan)
        this.$store.dispatch('addTotalTime', totalTime)
        this.$router.go(-1)
    }
}
```

