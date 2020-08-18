<template>
    <div class='portalHeader'>
        <el-row>
            <el-col :span="16" :offset="4">
                <el-col :span="16">
                    <div class="box" style="display:flex;align-items:center;height: 1rem;">
                        <img @click="$router.push({name:'home'})" src="../../assets/images/logo_lg.png" alt="pic"
                             style="cursor: pointer;height:.52rem;width: 3.8rem">
                    </div>
                </el-col>
                <el-col :span="8">
                    <div style="display:flex;justify-content:flex-end;align-items:center;height:1rem;">

                    </div>
                </el-col>
            </el-col>

        </el-row>
    </div>
</template>
<script>
    export default {
        name: "PortalHeader",
        components: {},
        data() {
            return {

            };
        },
        methods: {

        },
        computed: {

        }

    };
</script>
<style lang='scss' scoped>
    .portalHeader {
        width: 100%;
        .box img {
            width: 45%;
        }

        .line {
            width: 1px;
            height: .3rem;
            border-right: 1px dashed #BBBBBB;
            transform: rotate(20deg);
            /*margin: 0 6%;*/
            margin: 0 .4rem;
        }
        .el-row {
            height: 1rem;
            display: flex;
            align-items: center;
            box-sizing: border-box;
        }
    }
</style>
