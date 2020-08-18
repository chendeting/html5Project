<template lang="html">
    <div class="header">
        <img src="../assets/identify.png">
        <div class="flex-row ft_14">
            <span>{{year}}</span>
            <span>/</span>
            <span>{{time}}</span>
        </div>
    </div>
</template>

<script>
  import {formatDate} from './../utils'

  export default {
    data() {
      return {
        year: null,
        time: null
      }
    },
    mounted() {
      this.year = formatDate(new Date(), 'yyyy-MM-dd')
      this.time = formatDate(new Date(), 'hh:mm')
    },
    methods: {
    }
  }
</script>

<style lang="css" scoped>
    .header {
        width: 100%;
        height: 1.2rem;
        background-color: #d43d3d;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 3px;
        z-index: 99;
    }

    img {
        width: .67rem;
        height: .67rem;
        padding: .4rem;
    }
</style>
