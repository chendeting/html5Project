<template>
    <div class="Home">
        <el-row>
            <banner></banner>
        </el-row>
    </div>
</template>

<script>
    import VClamp from 'vue-clamp'
    import newOrProducts from './components/newOrProducts/Index'
    import partners from './components/partners/Index'
    import banner from '@/components/banner/Index'

    export default {
        name: "Home",
        components: {
            VClamp,
            newOrProducts,
            partners,
            banner
        },
        data() {
            return {
                zindex: 0,
                picArr: [],
                bannerPicArr: [],
                twoContent: {
                    title: '数据资产评估平台', //name
                    content: '数据资产评估平台是国信优易旗下一款服务全国的数据资产评估管理平台，改平台充分利用数据接入，清洗加工、人工智能、数据安全防护等技术手段，支持数据资产登记、数据资产确权，数据资产估值业务的开展，提供客观、公正、权威的数据资产评估报告，实现对企业数据、行业数据、政府数据的数据资产评估服务，促进数据资产作为一种资产发挥更大价值，为提升数据资产综合效能奠定基础。政府数据的数据资产评估服务，促进数据资产作为。',
                },
            }
        },
        mounted() {

        },
        methods: {
        }
    };
</script>
<style lang='scss' scoped>
    .more {
        width: 1.2rem;
        height: .4rem;
        background: rgba(42, 82, 152, 1);
        box-shadow: 0 .05rem .1rem 0 rgba(87, 104, 134, 0.3);
        color: #fff;
        border: none;
        transition: .5s;

        &:hover {
            opacity: .8;
        }
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: .14rem;
        opacity: 0.75;
        line-height: 2rem;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .el-carousel__item--card {
        width: 70%;
    }

    .tabBox {
        width: 100%;
        height: 100%;
        position: relative;

        .el-image {
            cursor: pointer;
            width: 90%;
            height: 100%;
            position: absolute;
            transform: translateX(20%) scale(.8);
            transition: all .3s linear
        }

        .el-image.active {
            z-index: 2;
            transform: translateX(0);
        }
    }

    .title {
        width: 100%;
        font-weight: bold;
        padding-top: .1rem;
        color: #2A5298;
        font-size: .32rem;
        line-height: .45rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .introduceContent {
        width: 100%;
        height: 1.8rem;
        overflow: hidden;
        padding: .3rem 0 .4rem;
        line-height: .24rem;
        text-overflow: ellipsis;
    }
</style>
