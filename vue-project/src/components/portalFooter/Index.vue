<template>
  <div class="portalFooter">
    <el-row style="padding-bottom:40px;border-bottom:1px solid #DDE3E920;">
      <el-col :span="16" :offset="4">
        <el-row>
          <el-col :span="4" class="footerContent clearfix">
            <div style="float: right;">
              <p>帮助中心</p>
              <ul class="getIn">
                <li v-for="(item,index) in helpList.slice(0,3)" :key="index" :data-id="item.id"  style="cursor: pointer;" @click="gohelp(item.id,item.name)">{{item.name}}</li>
                <!-- <li style="cursor: pointer;" @click="$router.push({ name:'helpCenter'})">常见问题</li> -->
              </ul>
            </div>
          </el-col>
          <el-col :span="7" class="footerContent clearfix">
            <div style="float: right;">
              <p>了解更多</p>
              <ul class="getIn">
                <li style="cursor: pointer;" @click="$router.push({name:'platformIntroduced'})">了解数据资产评估</li>
                <li style="cursor: pointer;" @click="$router.push({name:'solution'})">精选客户案例</li>
              </ul>
            </div>
          </el-col>
          <el-col :span="5" class="footerContent clearfix">
            <div style="float: right;">
              <p>关于我们</p>
              <ul class="getIn">
                <li style="cursor: pointer;"  @click="$router.push({name:'aboutUs'})">公司介绍</li>
                <li style="cursor: pointer;"  @click="$router.push({name:'legal'})">法律声明</li>
              </ul>
            </div>
          </el-col>
          <el-col :span="8" class="footerContent clearfix">
            <div style="float: right;">
              <p>联系我们</p>
              <ul>
                <li>服务热线：010-55556666</li>
                <li>公司地址：北京市丰台区南四环西</li>
                <li>路188号一区31号楼1层101-8</li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="text-align:center;font-size:12px;font-family:HelveticaNeue;color:#576886;">
      <p style="padding:20px 0 10px;">京ICP备15024075号-1 V1.0.0.151201.BETA 版权所有 国信优易数据有限公司</p>
      <p>© 2019 by youedata.cn. All Right Reserved</p>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "portalFooter"
}
</script>
<style lang='scss' scoped>
.portalFooter{
  height:260px;
  background:#061b4d;
  .footerContent{
    margin-top:30px;
    p{
      font-size:12px;
      font-weight:400;
      color:#fff;
      line-height:17px;
      margin-bottom: 20px;
    }
    ul li{
      font-size:12px;
      font-weight:400;
      color:#576886;
      line-height:17px;
      margin-bottom: 5px;
    }
    .getIn li:hover{
      color:#d8d8d8;
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
}

</style>
