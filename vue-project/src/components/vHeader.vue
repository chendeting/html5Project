<template lang="html">
  <div class="header">
    <img src="../assets/images/logo.png">
    <div class="flex-row ft_18">
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
    methods: {}
  }
</script>

<style lang="css" scoped>
  .header {
    width: 100%;
    height: 1.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 3px;
    background: -webkit-gradient(linear, left top, left bottom, from(#fff), color-stop(60%, #fefefe), color-stop(90%, #f0f0f0), to(#fff));
    background: linear-gradient(180deg, #fff, #fefefe 60%, #f0f0f0 90%, #fff);
    border-bottom: 1px solid #c4c4c4;
  }

  img {
    width: 1.9rem;
    padding: .4rem;
  }
</style>
