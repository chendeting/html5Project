<template>
  <div v-if="shengxiao">{{shengxiao}}</div>
</template>

<script>
  import {shengxiao} from './../utils/index'

  export default {
    name: "ShengXiao",
    data() {
      return {
        shengxiao: '猪'
      }
    },
    created() {
      this.timer()
    },
    methods: {
      // 这是一个获取数据
      getData(index) {
        this.shengxiao = shengxiao()[index].name
      },
      // 这是一个定时器
      timer() {
        return setInterval(() => {
          let _index = Math.floor(Math.random()*12)
           this.getData(_index)
        }, 100)
      }
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>

</style>