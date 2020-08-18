<template>
  <div>
    <div class="newsContent">
      <carousel></carousel>
    </div>
  </div>
</template>

<script>
import carousel from '@/components/carousel'
export default {
  components: {
    carousel
  }
}
</script>

<style lang="css" scoped>
.pos-header {
  position: fixed;
  top: 0;
}
</style>
