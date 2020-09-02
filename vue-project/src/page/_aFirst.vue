<template>
  <div class="about-container about-first">
    <div class="about-intro">
      <div class="title ft_24 text-center c_red">關於我們</div>
      <div class="content">
        <p>葡京王牌六合彩是從1至49個號碼中選出六個為中獎號碼的獎券，由香港賽馬會的附屬公司「香港馬會獎券葡京王牌分公司」經辦 。</p>
        <p>葡京王牌六合彩每晚攪珠一次，並於網絡現場直播。</p>
      </div>
    </div>
    <div class="about-content">
      <div class="title">
        玩法規則
      </div>
      <div class="rules-content">
        <p>葡京王牌六合彩注項單位為每注10澳元。選擇複式或膽拖注項時，可以每注澳門幣$5「部份注項單位」投注。</p>
        <p>有關之獎金則根據每注「部份注項單位」佔注項單位的份數計算。 每期六合彩攪珠均從49個號碼中攪出七個號碼。</p>
        <p>首六個號碼稱為「攪出號碼」，而第七個號碼稱為「特別號碼」。</p>
        <p>獎項詳情如下：</p>
      </div>
      <el-table
        v-if="tableData && tableData.length > 0"
        :data="tableData"
        class="rules-table"
        border
        :show-header="false"
        style="width: 100%">
        <el-table-column
          label=""
          width="50"
          align="center"
          prop="column1">
        </el-table-column>
        <el-table-column
          label=""
          :width="widthFlag ? 400 : 120"
          align="center"
          prop="column2">
        </el-table-column>
        <el-table-column
          label=""
          prop="column3"
          align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AFirst",
    data() {
      return {
        tableData: [],
        widthFlag: false
      }
    },
    mounted() {
      let _tableData = [{
        column1: '頭獎',
        column2: '選中6個「攪出號碼」',
        column3: '獎金會因應該期獲中頭獎注數而有所不同，每期頭獎獎金基金訂為不少於澳門幣800萬元。'
      },
        {
          column1: '二獎',
          column2: '選中5個「攪出號碼」+「特別號碼」',
          column3: '獎金會因應該期獲中二獎注數而有所不同'
        },
        {
          column1: '三獎',
          column2: '選中5個「攪出號碼」',
          column3: '獎金會因應該期獲中三獎注數而有所不同'
        },
        {
          column1: '四獎',
          column2: '選中4個「攪出號碼」+「特別號碼」',
          column3: '固定獎金澳門幣9,600元'
        },
        {
          column1: '五獎',
          column2: '選中4個「攪出號碼」',
          column3: '固定獎金澳門幣640元'
        },
        {
          column1: '六獎',
          column2: '選中3個「攪出號碼」+「特別號碼」',
          column3: '固定獎金澳門幣320元'
        },
        {
          column1: '七獎',
          column2: '選中3個「攪出號碼」',
          column3: '固定獎金澳門幣40元'
        }]
      this.tableData = _tableData
      window.addEventListener('resize', function () {
        this.tableData = []
        this.widthFlag = document.body.clientWidth >= 450
        this.tableData = _tableData
      })
    }
  }
</script>

<style scoped lang="css">
  .about-first .about-intro {
    padding: 0 .3rem;
  }

  .about-first .about-intro .title {
    margin: .3rem 0;
  }

  .about-first .about-intro .content {
    padding-bottom: .3rem;
    border-bottom: 1px solid #e3e3e3;
  }
</style>
