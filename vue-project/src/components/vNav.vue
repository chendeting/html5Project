<template>
  <div class="nav">
    <div class="channel">
      <ul>
        <li v-for="(channel, index) in channelsList"
            :class="{ active : $route.path.indexOf(channel.path) >= 0}"
            @click="clickChannel(channel,index)">{{channel.label}}
        </li>
      </ul>
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
        channelsList: [{name: 'index', path: '/index', label: '首页'},
          {name: 'FAQ', path: '/FAQ', label: 'FAQ'},
          {name: 'about', path: '/aboutUs', label: '關於我們'},
          {name: 'contact', path: '/contactWe', label: '聯繫我們'}]
      }
    },
    computed: {
      // isLoading() {
      //   return this.$store.state.load
      // }
    },
    mounted() {
      console.log('candy--打印:', this.$router)
    },
    methods: {
      clickChannel(channel, index) {
        this.isActive = index
        this.$router.push({path: channel.path})
        // scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="css" scoped>
  .nav {
    width: 100%;
    height: .96rem;
    background-color: #f4f5f6;
    display: flex;
  }

  .channel {
    flex: 1;
    white-space: nowrap;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    font-size: .45rem;
    color: #505050;
  }

  .channel::-webkit-scrollbar {
    height: 0;
  }

  .channel ul li {
    display: inline-block;
    margin-left: .32rem;
    margin-right: .32rem;
  }

  .active {
    color: #d43d3d;
  }
</style>
