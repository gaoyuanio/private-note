# Vuex笔记



### 1.Vuex概述

#### 1.1 vuex是什么

​	vuex是实现组件全局状态（数据）管理的一种机制，可以方便实现组件之间数据的共享

#### 1.2 使用Vuex统一管理状态的好处

- 能够在vuex众中集中管理共享的数据，易于开发和后期维护
- 能够高效地实现组件之间的数据共享，提高开发效率
- 存储在Vuex中的数据都是响应式的，能够实施保持数据与页面的同步

#### 1.3 什么样的数据适合存储到Vuex中

​	一般情况下，只有组件之间共享的数据，才有必要存储到vuex中；对于组件中的私有数据，依旧存储在组件自身的data中即可



### 2.vuex的基本使用

#### 2.1 安装vuex依赖宝

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

