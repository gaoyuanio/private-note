import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    showNum (state) {
      return `当前最新的count值为：${state.count}`
    }
  },
  // 只有mutations中定义的函数，才有权利修改state中的数据
  mutations: {
    add (state) {
      // 注意： 不要在mutations函数中，执行异步操作，例如定时器setTimeout()
      state.count++
    },
    addN (state, step) {
      state.count += step
    },
    sub (state) {
      state.count--
    },
    subN (state, step) {
      state.count -= step
    }
  },
  actions: {
    addAsync (context) {
      setTimeout(() => {
        // 在action中，不能直接修改state中的数据
        // 必须通过 context.commit()触发某个mutations才行
        context.commit('add')
      }, 1000)
    },
    addNAsync (context, step) {
      setTimeout(() => {
        // 在action中，不能直接修改state中的数据
        // 必须通过 context.commit()触发某个mutations才行
        context.commit('addN', step)
      }, 1000)
    },
    subAsync (context) {
      setTimeout(() => {
        // 在action中，不能直接修改state中的数据
        // 必须通过 context.commit()触发某个mutations才行
        context.commit('sub')
      }, 1000)
    },
    subNAsync (context, step) {
      setTimeout(() => {
        // 在action中，不能直接修改state中的数据
        // 必须通过 context.commit()触发某个mutations才行
        context.commit('subN', step)
      }, 1000)
    }
  },
  modules: {
  }
})
