<template>
  <div>
    <!-- <h3>当前最新的count值为：{{count}}</h3> -->
    <h3>{{showNum}}</h3>
    <button @click="btnHandler1">-1</button>
    <br/>
    <button @click="btnHandler2">-3</button>
    <br/>
    <button @click="btnHandler3">-1 Async</button>
    <br/>
    <button @click="btnHandler4">-3 Async</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['count']), // ...表示展开运算符
    ...mapGetters(['showNum'])
  },
  methods: {
    ...mapMutations(['sub', 'subN']),
    ...mapActions(['subAsync', 'subNAsync']),
    btnHandler1 () {
      this.sub()
    },
    btnHandler2 () {
      this.subN(3)
    },
    btnHandler3 () {
      this.subAsync()
    },
    btnHandler4 () {
      this.subNAsync(3)
    }
  }
}
</script>

<style>

</style>
