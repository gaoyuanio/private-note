

# Vuex笔记

[TOC]



### 1. Vuex概述

#### 1.1 vuex是什么

​	vuex是实现组件全局状态（数据）管理的一种机制，可以方便实现组件之间数据的共享

<img src="/Users/gaoyuan/Library/Application Support/typora-user-images/image-20201221091304337.png" alt="image-20201221091304337" style="zoom:50%;" />

#### 1.2 使用Vuex统一管理状态的好处

- 能够在vuex中集中管理共享的数据，易于开发和后期维护
- 能够高效地实现组件之间的数据共享，提高开发效率
- 存储在Vuex中的数据都是响应式的，能够实施保持数据与页面的同步

#### 1.3 什么样的数据适合存储到Vuex中

​	一般情况下，只有组件之间共享的数据，才有必要存储到vuex中；对于组件中的私有数据，依旧存储在组件自身的data中即可



### 2. vuex的基本使用

#### 2.1 安装vuex依赖

```nginx
npm install vex --save
```

#### 2.2 导入vuex包

```javascript
import Vuex from 'vuex'
Vue.use(Vuex)
```

#### 2.3 创建store对象

```javascript
const store = new Vuex.store({
  // state中存放的就是全局共享的数据
  state: { count: 0 }
})
```

#### 2.4 将store对象挂载到vue实例中

```javascript
new Vue({
  el: '#app',
  reader: h => h(app),
  router,
  // 将创建的共享数据对象，挂载到vue实例中
  // 所有的组件，就可以直接从store中获取全局的数据了
  store
})
```



### 3. 核心概念概述

> vuex中的主要核心概念如下：
>
> - **state**
> - **Mutation**
> - **Action**
> - **Getter**



#### 3.1 State

​	State提供唯一的公共数据源，所有的共享的数据都要统一放到Store的State中进行储存

```javascript
// 创建store数据源，提供唯一公共数据
const store = new Vuex.store({
  state: {
    count: 0
  }
})
```

（1）组件访问State中数据的第一种方式：

```javascript
this.$store.state.全局数据名称
```

（2）组件访问State中数据的第二种方式

```javascript
// 1.从vuex中按需导入 mapState函数
import { mapState } from 'vuex'
```

通过刚刚导入的mapState函数，将当前组件需要的全局数据，映射为当前数据的computed计算属性：

```javascript
// 2.将全局数据，映射为当前组件的计算属性
computed: {
	...mapState(['count'])
}
```



#### 3.2 Mutation

Mutation用于变更Store中的数据

1. 只能通过mutation变更Store数据，不可以直接操作Store中的数据

2. 通过这种方式虽然操作起来稍微繁琐一些，但是可以集中件套所有数据的变化

   

##### 3.2.1 定义mutations

```javascript
// 定义Mutation
const store = new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		add(state){
			//变更状态
			state.count++
		}
	}
})
```

##### 3.2.2 触发mutations

（1）触发mutations的第一种方式：

```javascript
// 触发mutation
methods: {
	handle1(){
		//	触发mutation的第一种方式
		this.$store.commit('add')
	}
}
```

可以在触发mutations时传递参数：

```javascript
// 定义Mutation
const store = new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		addN(state, step){
			//变更状态
			state.count += step
		}
	}
})

// 触发mutation
methods: {
	handle1(){
		//	触发mutation的第一种方式
		this.$store.commit('addN', 3)
	}
}
```

（2）触发mutations第二种方式：

```javascript
// 1.从vuex中按需导入mapMutations函数
import { mapMutations } from 'vuex'
```

通过刚才导入的mapMuntations函数，将需要的mutations函数，映射为当前组件的methods方法：

```javascript
// 2.将指定的mutations函数，映射为当前组件的methods函数
methods: {
	...mapMutations(['add','addN'])
}
```



#### 3.3  Action

> Action用于处理异步任务

如果通过异步操作变更数据，必须通过Action，而不能使用Mutation，但是在Action中还是要通过出发Mutation的方式间接变更数据。

##### 3.3.1 定义Action

```javascript
// 定义Action
const store = new Vuex.Store({
  	// ...此处省略其他代码
  mutaions: {
    add(state){
			state.count++
    }
  },
  actions: {
    addAsync(context){
      setTimeout(()=>{
        context.commit('add')
      },1000)
    }
  }
})
```

##### 3.3.2 触发Action

（1）触发actions的第一种方式

```javascript
methods:{
	handle(){
    // 触发actions的第一种方式
    this.$store.dispatch('addAsync')
  }
}
```

触发actions异步任务时携带参数：

```javascript
// 定义Action
const store = new Vuex.Store({
  	// ...此处省略其他代码
  mutaions: {
    addN(state,step){
			state.count += step
    }
  },
  actions: {
    addNAsync(context, step){
      setTimeout(()=>{
        context.commit('addN',step)
      },1000)
    }
  }
})

// 触发actions
methods:{
	handle(){
    this.$store.dispatch('addAsync', 5)
  }
}
```

（2）触发actions的第二种方式

```javascript
// 1.从vuex中按需导入mapActions函数
import { mapActions } from 'vuex'
```

通过刚才导入的mapActions函数，映射为当前组件的methods函数

```
methods: {
	...mapAction(['addAsync','addNASync'])
}
```



#### 3.4 Getter

Getter用于对store中的数据进行加工处理形成新的数据

- Getter可以对Store中已有的数据加工处理之后形成新的数据，类似Vue的计算属性

- Store中数据发生变化，Getter的数据也会跟着变化

  ```javascript
  // 定义Getter
  const store = new Vuex.Store({
    state: {
      count: 0
    },
    getters: {
      showNum: state => {
        return `当前最新的数据时【 ${state.count} 】`
      }
    }
  }) 
  ```

  

使用Getter的第一种方式：

```javascript
this.$store.getters.名称
```

使用Getter的第二种方式：

```javascript
import { mapGetters } from 'vuex'

computed: {
  ...mapGetters(['showNum'])
}
```

