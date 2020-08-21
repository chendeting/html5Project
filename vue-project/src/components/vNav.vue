<template>
  <div class="nav">
    <div class="channel">
      <ul class="module">
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
    },
    mounted() {
    },
    methods: {
      clickChannel(channel, index) {
        this.isActive = index
        this.$router.push({path: channel.path})
        scrollTo(0, 0)
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
    /*margin-top: 1.8rem;*/
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

  .channel ul li {
    display: inline-block;
    line-height: 1.2rem;
    padding: 0 .3rem;
  }

  .active {
    color: #fff;
    background: #d43d3d;
  }
</style>
