<template>
  <div>
    <!-- <h3>当前最新的count值为：{{ $store.state.count }}</h3> -->
    <h3>{{$store.getters.showNum}}</h3>
    <button @click="btnHandler1">+1</button>
    <br/>
    <button @click="btnHandler2">+3</button>
    <br/>
    <button @click="btnHandler3">+1 async</button>
    <br/>
    <button @click="btnHandler4">+3 async</button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    btnHandler1 () {
      this.$store.commit('add')
    },
    btnHandler2 () {
      this.$store.commit('addN', 3)
    },
    btnHandler3 () {
      this.$store.dispatch('addAsync')
    },
    btnHandler4 () {
      this.$store.dispatch('addNAsync', 3)
    }
  }
}
</script>

<style>

</style>
