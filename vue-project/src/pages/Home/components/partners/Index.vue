<template>
    <div class="partners">
        <el-row>
            <el-col :span="16" :offset="4">
                <div class="partnersBox">
                    <el-carousel trigger="click" height=".9rem" @change="change" :autoplay='false' indicator-position="none">
                        <el-carousel-item v-for="items in size" :key="items" style="display: flex;align-items: center">
                            <div v-for="(item,index) in partnerList" :key="index" style="width:20%;height:.5rem;display:inline-block;text-align:left">
                                <el-image :src="$baseURL+item.logo" fit="cover"></el-image>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "partners",
        components: {},
        data() {
            return {
                limit: 5,
                curPage: 1,
                partnerList: [],
                total: null,
                size: 2,
            };
        },
        methods: {
            change(e) {
                console.log(e)
                this.curPage = e + 1
                this.getParteners()
            }
        },
        mounted() {
        },
    };
</script>
<style lang='scss' scoped>
    .partnersBox {
        margin:.6rem 0;
        .partnersContent {
            width: 100%;
            height: 1.4rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .el-image {
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
        }
        .el-image {
            cursor: pointer;
        }
    }
</style>
