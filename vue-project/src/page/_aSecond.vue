<template>
  <div class="about-container about-second">
    <div class="about-content">
      <div class="title">遊戲規範</div>
      <div class="detailRule">
        <p>獎金的分配須受香港馬會獎券葡京王牌分公司的獎券規例所約制。</p>
        <p>獎金大致分配如下：</p>
        <el-table
          :data="tableData"
          class="rules-table"
          border
          style="width: 100%">
          <el-table-column
            label="各組獎金"
            width="120"
            align="center"
            prop="column1">
          </el-table-column>
          <el-table-column
            label="獎金分配（每澳門幣$10一注）"
            align="center"
            prop="column2">
          </el-table-column>
        </el-table>
        <p style="margin-bottom: 0.2rem">
          獎金基金是指每期攪珠的總投注額的百分之五十四。 餘下的百分之四十六將根據博彩稅條例分配如下：
        </p>
        <p class="marktail">(i) 獎券收益的徵稅(百分之二十五)；</p>
        <p class="marktail">(ii) 獎券基金(百分之十五)；</p>
        <p class="marktail">(iii) 香港馬會獎券葡京王牌分公司的佣金(百分之六)。</p>
        <p style="margin: 0.2rem 0">
          第一組、第二組及第三組獎金基金之分配百分率可作調整，以盡量確保在任何時間內，每一有關獎金以一注項單位作計算：
        </p>
        <p class="marktail">(i) 第一組獎金應最少為第二組獎金的兩倍； </p>
        <p class="marktail">(ii) 第二組獎金應最少為第三組獎金的兩倍；</p>
        <p class="marktail">(iii) 第三組獎金應最少為第四組獎金的兩倍；</p>
        <p class="marktail">(iv) 第四組、第五組、第六組及第七組獎金亦可根據獎券規例而被調整。</p>

        <div class="subtitle">
          中獎登記
        </div>
        <p>若獲中之獎金為每十元一注超過五百萬元，所有中獎彩票持票人士或經由電話投注服務的中獎人士，請於指定時間(公佈攪珠結果後至翌日下午5時)致香港馬會獎券葡京王牌分公司在線服務系統登記。</p>
        <div class="subtitle">
          领取资金
        </div>
        <p>所有獲中彩票，必須於有關攪珠的日期後起計60天內領取 (例子：於3月1日所舉行的攪珠的獲中彩票，可於3月1日當天至4月30日內任何一天領取)。</p>
        <div class="subtitle">
          獎券規例
        </div>
        <p>所有獎券注項均受香港馬會獎券葡京王牌分公司規例所規限。如此通告與獎券規例有任何出入之處，一概以獎券規例為準。</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ASecond",
    data() {
      return {
        tableData: [{
          column1: '第一組獎金',
          column2: '45% x ﹝獎金基金減去第四、五、六及七組的總獎金﹞÷ 中獎單位 每期頭獎獎金基金訂為不少於澳門幣800萬元。'
        },
          {
            column1: '第二組獎金',
            column2: '15% x ﹝獎金基金減去第四、五、六及七組的總獎金﹞÷ 中獎單位'
          },
          {
            column1: '第三組獎金',
            column2: '40% x ﹝獎金基金減去第四、五、六及七組的總獎金﹞÷ 中獎單位'
          },
          {
            column1: '第四組獎金',
            column2: '每注澳門幣9,600元'
          },
          {
            column1: '第五組獎金',
            column2: '每注澳門幣640元'
          },
          {
            column1: '第六組獎金',
            column2: '每注澳門幣320元'
          },
          {
            column1: '第七組獎金',
            column2: '每注澳門幣40元'
          }]
      }
    }
  }
</script>

<style scoped>
  .about-second {
    padding-bottom: .4rem;
  }
</style>
