<template lang="html">
  <div>
    关于我们
  </div>
</template>

<script>
export default {
  data() {
    return {
      addChannel: []
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="css" scoped>
.header {
  width: 100%;
  height: 1.33rem;
  background-color: #d43d3d;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header img {
  width: 25px;
  height: 25px;
  padding-left: .19rem;
}
.header span:last-child {
  opacity: 0;
}
.content {
  position: absolute;
  top: 1.33rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f8f8f8;
}
.title {
  padding-left: .27rem;
  color: #666;
  font-size: 12px;
}
.deleteTitle {
  padding-bottom: 10px;
  padding-top: 4px;
}
.addTitle {
  padding-top: 20px;
  padding-bottom: 10px;
}
li {
  display: inline-block;
}
.channelCss {
  width: 1.90rem;
  height: .90rem;
  border: 1px solid #ccc;
  margin: .13rem .27rem;
  text-align: center;
  line-height: .90rem;
  font-size: 16px;
}
</style>
