<template>
    <div class="newOrProducts">
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="15">
                <div style="position: relative;">
                    <div class="new_title">
                        <div class="back_img"></div>
                        <h3 style="font-weight: bold; font-size: .32rem;color: #2A5298">热点新闻</h3>
                    </div>
                    <div class="more" @click="goNewsCenter">
                        <span style="vertical-align: middle;color: #2A5298">更多</span>
                        <img style="vertical-align: middle;margin-left: .1rem;" src="./img/icon_news_more.png" alt="">
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="5" v-for="(item, index) in threeContent" :key="index">
                <div class="news">
                    <div class="news-img">
                        <el-image :src="$baseURL + item.site" fit="cover"></el-image>
                    </div>
                    <div class="content_text">
                        <h4 style="font-size: .16rem">
                            <v-clamp autoresize :max-lines="2">{{item.title}}</v-clamp>
                        </h4>
                        <span><v-clamp autoresize :max-lines="3" style="font-size: .12rem">{{item.introduce}}</v-clamp></span>
                    </div>
                    <div class="card_foot">
                        <span style="font-size: .16rem;">{{formateDate(item.updateTime)}}</span>
                        <el-button class="more_btn_2" style="margin-left: .44rem;font-size: .14rem;" round @click="jumpInDetail(item.id,item.type)">更多</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "newOrProducts"
    };
</script>
<style lang='scss'>
    .newOrProducts {
        background-color: #F9F9F9;
        padding: .2rem 0 .6rem 0;

        .more {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            cursor: pointer
        }

        .more_btn {
            margin: auto;
            /*margin-left: 40px;*/
            cursor: pointer;
            /*width: 90px;*/
            height: .3rem;
            background: rgba(42, 82, 152, 1);
            border: none;
        }
        .more_btn_2{
            cursor: pointer;
            /*width: 90px;*/
            height: .3rem;
            background: rgba(42, 82, 152, 1);
            border: none;
        }
        .news {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 4.2rem;
            background: #fff;
            transition: .3s;
            position: relative;
            &:hover {
                box-shadow: 0 .02rem .1rem 0 rgba(87, 104, 134, 0.4);
            }
            .news-img{
                // min-height: 180px;
            }
            .content_text {
                margin: .2rem;
                h4 {
                    font-size: .16rem;
                    height: .48rem;
                    color: rgba(42, 82, 152, 1);
                }
            }
            .card_foot {
                // position: absolute;
                // bottom: 20px;
                padding: 0 .2rem .3rem .2rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                span {
                    margin-right: auto;
                }

            }
        }

        .new_title {
            margin: 0 auto;
            /*width: 307px;*/
            height: .82rem;
            background-position: 0;
            .back_img {
                box-sizing: border-box;
                margin: .1rem auto;
                width: 3.12rem;
                height: .84rem;
                background: url("./img/text_hotnews.png") no-repeat;
            }
            h3 {

            }
        }

        .el-menu-demo-new {
            display: flex;
            justify-content: center;
            font-weight: 400;
            margin: 0 auto;
            line-height: .6rem;

            li {
                cursor: pointer;
                font-weight: bold;
                color: #BBBBBB;
                margin: 0 4% 8px;

                &:hover {
                    color: #2A5298;
                    // border-bottom: 4px solid #2A5298;
                }
            }

            li.active {
                font-weight: bold;
                color: #2A5298;
                border-bottom: .04rem solid #2A5298;
            }
        }

        .bottom {
            padding: 0 .2rem .2rem;

            .button {
                padding: .06rem .25rem;
                background: rgba(42, 82, 152, 1);
                border-radius: .15rem;
                color: #fff;
                margin-left: 20%;
            }

            .time {
                font-family: 'HelveticaNeue-Italic';
                font-weight: normal;
                color: #bbbbbb;
                line-height: .3rem;
            }
        }

        .cardBox {
            display: flex;
            justify-content: center;
            margin-top: .4rem;

            .cardList {
                width: 33%;
                margin-right: .2rem
            }

            .cardList:last-child {
                margin-right: 0;
            }
        }

        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }

        .clearfix:after {
            clear: both
        }

        h3 {
            /*width: 128px;*/
            height: .4rem;
            font-size: .32rem;
            font-weight: bold;
            color: rgba(42, 82, 152, 1);
            line-height: .4rem;
            display: inline-block;
            position: absolute;
            bottom: .18rem;
            left: 50%;
            transform: translateX(-50%);
        }

        ul {
            /*width: 1276px;*/
            margin: .4rem auto 0 auto;
            padding: 0 3.7rem;
            display: flex;
            justify-content: space-around;
            align-items: center
        }

        ul > li {
            width: 3.8rem;
            height: 4.2rem;
            background: rgba(255, 255, 255, 1);
            transition: all .5s;
            position: relative;

        }

        button {
            width: .9rem;
            height: .3rem;
            background: rgba(42, 82, 152, 1);
            border-radius: .15rem;
            color: #fff;
        }

    }

    .el-row {
        margin-bottom: .2rem;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: .36rem;
    }

    .row-bg {
        padding: .01rem 0;
        background-color: #f9fafc;
    }
</style>
