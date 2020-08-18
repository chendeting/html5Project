<template>
  <div id="app">
    <!--<div v-show="isLoading" class="loading">-->
      <!--<img src="./assets/loading.png">-->
    <!--</div>-->
    <v-header class="pos-header"></v-header>
    <v-nav></v-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vHeader from '@/components/vHeader'
  import vNav from '@/components/vNav'

  export default {
    name: 'app',
    components: {
      vHeader,
      vNav
    }
  }
</script>

<style>
  img {
    width: 100%;
  }

  html, body {
    overflow-x: hidden;
  }
  .loading {
    position: absolute;
    top: 2.16rem;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    background-color: #fff;
    z-index: 99;
  }

  .loading img {
    margin-top: 30px;
    width: 50px;
    height: 50px;
    animation: loading .6s linear infinite
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
