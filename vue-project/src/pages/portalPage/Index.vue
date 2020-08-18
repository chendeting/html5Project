<template>
    <div class="portalPage">
        <portalHeader></portalHeader>
        <layout></layout>
        <router-view></router-view>
    </div>
</template>

<script>
    import portalHeader from '@/components/portalHeader/index'
    import layout from '@/components/layout/layout'
    export default {
        name: "portalPage",
        components: {
            portalHeader,
            layout
        }
    };
</script>
<style lang='scss' scoped>
    .portalPage {
        max-width: 1200px;
        margin: 0 auto;
        width: 100vw;
    }
</style>
