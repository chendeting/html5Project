<template>
  <div id="app" class="module">
    <!--<div v-show="isLoading" class="loading">-->
      <!--<img src="./assets/loading.png">-->
    <!--</div>-->
    <div class="layout-box">
      <v-header class="pos-header"></v-header>
      <v-nav></v-nav>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div class="layout-push"></div>
    </div>
    <div class="bottom">版權所有 不得轉載 © 2020 澳門六合彩</div>
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
    height: 100%;
    width: 100%;
  }
  #app {
    max-width: 1200px;
    margin: 0 auto;
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
  .layout-box {
    width: 100%;
    min-height: 100%;
    margin-bottom: -1rem;
  }
  .layout-push {
    width: 100%;
    height: 1rem;
  }
  .bottom {
    margin: 0 auto;
    width: 100%;
    height: 1rem;
    box-sizing: border-box;
    line-height: 1rem;
    text-align: center;
    border-top: .1rem solid #eee222;
    font-size: .4rem;
    /*position: fixed;*/
    /*z-index: 100;*/
    /*left: 0;*/
    /*bottom: 0;*/
    background: #fff;
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
