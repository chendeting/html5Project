<template>
  <div class="helpCenter">
    <el-row>
      <el-col :span="16" :offset="4">
        <el-row :gutter="20">
          <el-col :span="4">
            <div>
              <p class="title">帮助中心</p>
              <ul>
                <li class="helpList" :class="item.id == helpCenterPageInfo.type ?'active':'' " @click="change" :data-id="item.id"  v-for="(item,index) in helpTitleArr" :key="index">{{item.name}}</li>
              </ul>
              <el-pagination v-if="helpCenterTypePageInfo.total > 10"
                background
                @current-change = "helpCenterTypePageInfoChange"
                layout="prev, next"
                prev-text="< 上一页"
                next-text="下一页 >"
                :total="helpCenterTypePageInfo.total"
                :page-size="helpCenterTypePageInfo.limit"
                :current-page.sync="helpCenterTypePageInfo.curPage"
              ></el-pagination>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="helpBox" v-for="(item,index) in helpArr" :key="index">
              <p style="padding-bottom:10px;font-weight:bold;color:#061B4D;line-height:22px;">{{item.title}}</p>
              <p style="font-size:12px;line-height:17px;" v-html="item.content"></p>
            </div>
            <el-pagination 
                background
                @current-change = "helpCenterPageInfoChange"
                layout="prev,pager,next"
                prev-text="< 上一页"
                next-text="下一页 >"
                :total="helpCenterPageInfo.total"
                :page-size="helpCenterPageInfo.limit"
                :current-page.sync="helpCenterPageInfo.curPage"
              ></el-pagination>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "helpCenter",
  components: {},
  data() {
    return {
      helpCenterTypePageInfo: {
        limit: 10,
        curPage:1,
        total:1
      },
      helpCenterPageInfo: {
        limit: 10,
        curPage:1,
        // status: '已发布',
        type: '',
        total:1
      },
      helpArr:[],
      helpTitleArr:[],
      type:''
    };
  },
  methods: {
    change(e) {
      this.helpCenterPageInfo.type = e.target.dataset.id
      this.getHelpList()
    },
    helpCenterTypePageInfoChange(val) {
      this.helpCenterTypePageInfo.curPage = val
      this.getHelpType()
    },
    helpCenterPageInfoChange(val) {
      this.helpCenterPageInfo.curPage = val
      this.getHelpList()

    }
  },
  mounted() {
    this.helpCenterPageInfo.type = this.$router.history.current.query.id
    this.type = this.$router.history.current.query.id
    this.getHelpType()
    // this.getHelpList()
  },
  watch: {
    $route(){
      this.type = this.$router.history.current.query.id
      this.helpCenterPageInfo.type = this.$router.history.current.query.id
    }
  }
};
</script>
<style lang='scss' scoped>
.helpCenter{
  padding:40px 0;
  min-height: 500px;
  .title{
    height:80px;
    text-align: center;
    font-size:24px;
    font-weight:bold;
    color:#2a5298;
    line-height:80px;
    border:1px solid #ECEDEF;
  }
  .helpList{
    height:60px;
    line-height: 60px;
    background-color: #fff;
    color:#2A5298;
    text-align: center;
    font-weight:bold;
    &:hover {
      background-color: #2A5298;
      color:#fff;
      cursor: pointer;
    }
  }
  .active {
    background-color: #2A5298;
    color:#fff;
  }
  .helpBox{
    padding:10px 30px 30px;
    box-shadow:0px 1px 1px 0px #ecedef;
  }
  /deep/.el-pagination{
    float: right;
    margin-top: 20px
  }
}
</style>
