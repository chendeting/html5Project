<template>
    <div class="banner">
        <el-carousel v-if="bannerPicArr.length>=1" trigger="click" height="3rem" style="overflow:hidden"
                     :indicator-position="bannerPicArr.length>1?'':'none'"
                     :arrow="bannerPicArr.length>1?'hover':'never'">
            <el-carousel-item v-for="(item,index) in bannerPicArr" :key="index">
                <!-- <el-image :src="item.url" alt="banner" fit="fill"></el-image> -->
                <a :href="item.url" target="_black">
                    <!-- <div class="bannerBox"
                         :style="'background:url('+defaultBanner+') no-repeat;background-size:contain'">
                        <div>
                            <p style="font-size:56px;color:#fff;font-weight:bold;text-align:center;padding-bottom:20px;">
                                {{item.text}}</p>
                            <p style="font-size:24px;color:#fff;text-align:center;padding-top:20px;">
                                {{item.subtitle}}</p>
                        </div>

                    </div> -->
                    <div class="bannerBox"
                         :style="'background:url('+$baseURL + item.site+') no-repeat;background-size:cover;'">
                        <div>
                            <p style="font-size:56px;color:#fff;font-weight:bold;text-align:center;padding-bottom:20px;">
                                {{item.text}}</p>
                            <p style="font-size:24px;color:#fff;text-align:center;padding-top:20px;">
                                {{item.subtitle}}</p>
                        </div>

                    </div>
                </a>
            </el-carousel-item>
        </el-carousel>
        <div v-else>
           <img :src="defaultBanner" style="width:100%">
        </div>
    </div>
</template>

<script>
    export default {
        name: "banner",
        data() {
            return {
                bannerPicArr: [],
                defaultBanner: ''
            }
        }
    };
</script>
<style lang='scss' scoped>
    .banner {
        width: 100%;
        height: 3rem;
        /*max-height: 3rem;*/
        .bannerBox {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
    }
</style>
