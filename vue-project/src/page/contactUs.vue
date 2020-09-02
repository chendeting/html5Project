<template lang="html">
  <div class="contact-us module">
    <img src="./../assets/images/banner3.jpg" alt="背景图" class="aboutImg">
    <div class="about-container mtb-3">
      <div class="about-content">
        <div class="title ft_26 text-center c_red">聯繫我們</div>
        <div class="content">
          <p>葡京王牌六合彩將竭誠為您提供最及時、最便捷、及滿意的服務。若有問題可透過以下方式與我們取得聯繫。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        result: '',
        keywords: '',
        isLoading: false
      }
    },
    methods: {}
  }
</script>

<style lang="css" scoped>
  .search-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .header {
    width: 100%;
    height: 1.33rem;
    background-color: #d43d3d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
  }

  .header span:last-child {
    opacity: 0;
  }

  .header img {
    width: 25px;
    height: 25px;
    padding-left: .13rem;
  }

  .search {
    width: 100%;
    height: 1.07rem;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search input {
    width: 96%;
    height: 26px;
    border-radius: 4px;
    border: #ccc;
    outline: #ccc;
    text-align: center;
  }

  .loading {
    position: absolute;
    top: 2.4rem;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    background-color: #fff;
    z-index: 99;
  }

  .news-content {
    margin-top: 2.6rem;
  }

  .section {
    width: 100%;
    height: 2.5rem;
    border-bottom: 1px solid #ccc;
  }

  .news {
    height: 2.25rem;
    box-sizing: border-box;
    margin: 10px 10px;
    display: flex;
  }

  .news-left {
    height: 100%;
    width: 2.8rem;
    display: inline-block;
  }

  .news-left img {
    width: 100%;
    height: 100%;
  }

  .news-right {
    flex: 1;
    padding-left: 10px;
  }

  .newsTitle {
    width: 100%;
    height: 62%;
    color: #404040;
    font-size: 18px;
    overflow: hidden;
  }

  .newsMessage {
    width: 100%;
    height: 38%;
    display: flex;
    align-items: flex-end;
    color: #888;
    justify-content: space-between;
    overflow: hidden;
    white-space: nowrap;
  }

  .loading {
    position: fixed;
    top: 2.4rem;
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
