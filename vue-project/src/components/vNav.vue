<template>
  <div class="plr-3">
    <div class="nav">
      <div class="channel">
        <el-menu
          :router="true"
          :default-active="$route.name"
          text-color="#000"
          active-text-color="#fff">
          <el-menu-item v-for="item in channelsList"
                        :route="{name: item.name}"
                        :key="item.name"
                        :index="item.name">
            <template slot="title">
              <span>{{item.label}}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
  import carousel from '@/components/carousel'

  export default {
    components: {
      carousel
    },
    data() {
      return {
        isActive: 0,
        isLoading: false,
        channelsList: [{name: 'index', path: '/', label: '首页'},
          {name: 'FAQ', path: '/FAQ', label: 'FAQ'},
          {name: 'about', path: '/aboutUs', label: '關於我們'},
          {name: 'contact', path: '/contactWe', label: '聯繫我們'}]
      }
    }
  }
</script>

<style lang="css" scoped>
  .nav {
    width: 100%;
    height: 1.2rem;
    background-color: #f4f5f6;
    display: flex;
  }

  .channel {
    flex: 1;
    white-space: nowrap;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    font-size: .5rem;
    color: #505050;
  }

  .channel::-webkit-scrollbar {
    height: 0;
  }

  .channel ul {
    width: 100%;
  }

  .channel ul li {
    display: inline-block;
  }

  .el-menu {
    border: none;
    background: transparent;
  }

  .el-menu-item {
    font-size: .5rem;
    padding: 0 15px;
  }

  .el-menu-item.is-active {
    color: #fff;
    background: #d43d3d;
  }
</style>
