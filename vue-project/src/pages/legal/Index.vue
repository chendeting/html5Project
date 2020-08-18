<template>
    <div class="law">
        <el-row>
            <div class="title">
                法律声明
            </div>
        </el-row>
        <el-row style="margin-bottom:100px">
            <el-col :span="16" :offset="4">
                <p v-html="content" style="line-height: 200%"></p>
            </el-col>
        </el-row>
        <el-row>
            <contactUs></contactUs>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "legal"
    };
</script>
<style scoped lang="scss">
    .title{
        font-size: 32px;
        font-weight: bold;
        color: #2a5298;
        margin: 80px auto;
        text-align: center;
        line-height: 32px;
    }
</style>

