<template lang="html">
  <div class="detail">
    <div class="content">
      <div class="container">
        <img :src="$route.params.item && $route.params.item.pic || require('../assets/tongyong.jpg')">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {

  }
}
</script>

<style lang="css" scoped>
.detail {
  overflow: hidden;
}
.header {
  width: 100%;
  height: 1.33rem;
  background-color: #d43d3d;
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
}
.header img {
  width: 25px;
  height: 25px;
  padding: 0 .19rem;
}
.content {
  padding-top: 1.33rem;
}
.container {
  margin: 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.message {
  text-align: center;
  margin: 20px 0;
  color: #888;
}
.message span:last-child {
  margin-left: 10px;
}
.container img {
  width: 100%;
  margin-bottom: 20px;
}
.newsContent {
  font-size: 18px;
  line-height: 30px;
}
</style>
