<template lang="html">
  <div class="carousel">
    <transition-group tag="ul" name="image" class="clearfix">
      <li v-for="(item, index) in slides"
          :key="'image' + index"
          v-show="index===nowIndex">
        <img :src="item.src">
      </li>
    </transition-group>
    <div class="bullet">
        <span v-for="(item,index) in slides.length"
              :key="'bullet' + index"
              :class="{active:index===nowIndex}"></span>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.play()
    },
    data() {
      return {
        nowIndex: 0,
        slides: [
          {src: require('../assets/images/banner1.jpg')},
          {src: require('../assets/images/banner2.jpg')},
          {src: require('../assets/images/banner3.jpg')}
        ]
      }
    },
    methods: {
      autoPlay() {
        this.nowIndex++
        if (this.nowIndex === this.slides.length) {
          this.nowIndex = 0
          return
        }
      },
      play() {
        setInterval(this.autoPlay, 5000)
      }
    }
  }
</script>

<style lang="css" scoped>
  .carousel {
    position: relative;
  }

  .carousel ul {
    position: relative;
    height: 4.3rem;
    overflow: hidden;
  }

  .carousel, ul, li {
    width: 100%;
    max-width: 1200px;
  }

  li {
    position: absolute;
  }

  li img {
    width: 100%;
    height: 4.3rem;
  }

  .image-enter-active {
    transform: translateX(0);
    transition: all 1s ease;
  }

  .image-leave-active {
    transform: translateX(-100%);
    transition: all 1s ease;
  }

  .image-enter {
    transform: translateX(100%);
  }

  .image-leave {
    transform: translateX(0);
  }

  .bullet {
    width: 100%;
    max-width: 1200px;
    position: absolute;
    bottom: .3rem;
    margin: 0 auto;
    text-align: right;
    z-index: 10;
  }

  .bullet span {
    width: 10px;
    height: 10px;
    border: 1px solid;
    display: inline-block;
    margin-right: 10px;
    border-radius: 10px;
  }

  .active {
    background-color: #fff;
  }
</style>
