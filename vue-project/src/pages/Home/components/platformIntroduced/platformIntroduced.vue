<template>
    <div class="platformIntroduced">
        <el-row>
            <div class="banner">
                <img :src="$baseURL+banner" style="position: absolute; left: 0;top: 0;">
                <div class="title" style="position: absolute; width: 100%;">
                    <div class="main-title">{{mainTitle}}</div>
                    <div class="other-title">{{otherTitle}}</div>
                </div>
            </div>
        </el-row>
        <el-row>
            <el-col :span="16" :offset="4">
                <!-- 平台介绍 -->
                <div class="platformIntroduced-item">
                    <div style="text-align: center">
                        <div class="title title_shadow" style="display: inline-block; margin: 0 auto">
                            <v-clamp autoresize :max-lines="1">{{platformIntroducedInfo.name}}</v-clamp>
                        </div>
                    </div>
                    <!--<div class="split"></div>-->
                    <div class="text">{{platformIntroducedInfo.home}}</div>
                </div>

                <!-- 详情 -->
                <div v-for="(item,index) in contentArray" :key="index" class="platformIntroduced-item">
                    <div style="text-align: center">
                        <div class="title title_shadow" style="display: inline-block">
                            <v-clamp autoresize :max-lines="1"> {{item.name}}</v-clamp>
                        </div>
                    </div>
                    <!--<div class="split"></div>-->
                    <div class="text" v-html="item.content"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "platformIntroduced"
    };
</script>
<style lang='scss' scoped>
    .platformIntroduced {
        .title_shadow {
            font-size:24px;
            font-weight:400;
            color:rgba(6,27,77,1);
            line-height:28px;

            &:before {
                content: '';
                width: 95%;
                height: 12px;
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                background: #576886FF;
                opacity: .1
            }
        }
        .banner {
            width: 100%;
            height: 3rem;
            text-align: center;

            img {
                width: 100%;
                height: 100%;
                position: relative;
            }

            .title {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #fff;
                display: block;
                width: 100%;

                .main-title {
                    font-size: .56rem;
                    margin-bottom: .6rem;
                    font-weight: bold
                }

                .other-title {
                    font-size: .36rem
                }
            }
        }
        .platformIntroduced-item {
            width: 100%;
            overflow: hidden;
            margin: 60px 0;
            .title {
                font-size: 24px;
                color: #061B4D;
                text-align: center;
                position: relative;
                z-index: 1;
                line-height: 24px;
            }
            .split {
                width: 100px;
                height: 12px;
                background: rgba(87, 104, 134, 0.1);
                margin: 0 auto;
                position: relative;
                z-index: 0;
                top: -3px;
            }
            .text {
                color: #576886;
                margin-top: 20px;
                font-size: 16px;
                line-height: 25px;
                /deep/ p {
                    display: flex
                }
            }
        }
    }
</style>
