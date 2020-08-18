<template>
    <div class="layout">
        <div style="background-color:#F2F2F2;width:100%;">
            <el-row>
                <el-col :span="16" :offset="4">
                    <ul class="el-menu-demo">
                        <li :class="name == 'home' ?'active':''" @click="tabNav(0,'home')">首页</li>
                        <li :class="name == 'productCenter' ?'active':''" @click="tabNav(1,'productCenter')">产品中心</li>
                        <li :class="name == 'newsCenter'?'active':''" @click="tabNav(3,'newsCenter')">新闻中心</li>
                        <li :class="name == 'partners'?'active':''" @click="tabNav(4,'partners')">合作伙伴</li>
                        <li :class="name == 'aboutUs'?'active':''" @click="tabNav(5,'aboutUs')">关于我们</li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "layout",
        components: {},
        data() {
            return {
                tabIndex: [false, false, false, false, false, false],
                name: ''
            };
        },
        computed: {},
        watch: {
            '$route.name': function (newVal, oldVal) {
                this.name = newVal
            }
        },
        methods: {
            tabNav(num, name) {
                this.tabIndex.forEach((item, index) => {
                    this.$set(this.tabIndex, index, false)
                })
                this.$set(this.tabIndex, num, true)
                this.name = name
                this.$router.push({
                    name: name,
                });

            },
        },
        mounted() {
            this.name = this.$router.history.current.name
        },
        created() {
            let listNum = this.$route.meta.listNum
            this.tabIndex.forEach((item, index) => {
                this.$set(this.tabIndex, index, false)
            })
            this.$set(this.tabIndex, listNum, true)
        }
    };
</script>
<style lang='scss' scoped>
    .layout {
        .el-menu-demo {
            font-weight: 400;
            margin: 0 auto;
            height: .6rem;
            line-height: .6rem;
            font-size: .16rem;

            li {
                cursor: pointer;
                display: inline-block;
                color: #888888;
                padding: 0 3%;

                &:first-child {
                    padding-left: 0;
                }

                &:hover {
                    color: #2A5298;
                }
            }

            li.active {
                font-weight: bold;
                color: #2A5298;
            }
        }
    }

</style>
