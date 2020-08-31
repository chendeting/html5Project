<template lang="html">
  <div class="about-us module">
    <img src="./../assets/images/banner2.jpg" alt="背景图" class="aboutImg">
    <el-tabs v-model="activeName">
      <el-tab-pane label="玩法規則" name="first">
        <a-first></a-first>
      </el-tab-pane>
      <el-tab-pane label="遊戲規範" name="second">
        <a-second></a-second>
      </el-tab-pane>
      <el-tab-pane label="獎券規例" name="third">
        <a-three></a-three>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import AFirst from "./_aFirst";
  import ASecond from "./_aSecond";
  import AThree from "./_aThree";
  export default {
    name: 'aboutUs',
    components: {AThree, ASecond, AFirst},
    data() {
      return {
        activeName: 'first'
      };
    }
  };
</script>

<style lang="css" scoped>
  .aboutImg {
    width: 100%;
    display: block;
  }

  /deep/ .about-us .el-tabs__item {
    padding: 0 .2rem;
    font-size: .45rem;
  }

  /deep/ .about-us .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: .2rem;
  }
</style>
