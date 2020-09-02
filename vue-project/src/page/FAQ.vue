<template lang="html">
  <div class="FAQ-content">
    <el-collapse v-if="dataList" v-model="activeNames">
      <el-collapse-item
        v-for="(item,index) in dataList"
        :key="index"
        :name="index">
        <template slot="title">
          <span class="FAQ-title">{{item.question}}</span>
        </template>
        <div>{{item.answer}}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeNames: [],
        dataList: [{
          question: '1、葡京王牌六合彩在什麼時間段可以購買？',
          answer: '答：葡京王牌六合彩票為區域性彩種，請根據具體投注站點的營運時間購買。'
        },
          {
            question: '2、需要多少錢才可以購買？',
            answer: '答：葡京王牌六合彩注項單位為每注10澳門幣。'
          },
          {
            question: '3、單張彩票可以購買多少金額？',
            answer: '答：購買者可對其選定的投注號碼進行單倍或多倍投注，投注倍數範圍為1-100倍。單張彩票的投注金額最高不得超過1000澳門幣。'
          },
          {
            question: '4、我應如何確認是否中獎？',
            answer: '答：您可在葡京王牌六合彩的銷售站點查詢確認、或在葡京王牌六合彩官網的“開獎公告”處查詢核對中獎號碼。'
          },
          {
            question: '5、如何能進一步確認開獎結果的正確性？',
            answer: '答：您可在葡京王牌六合彩官網查看即時開獎公告與開獎視頻，或查看歷史開獎期號的視頻回放。'
          },
          {
            question: '6、購買彩券後可以退款不買嗎？',
            answer: '答：抱歉，根據《奖券规例》規定獎券彩票一經發出給參加者或經參加者確認，參加者不得以任何理由更換、取消或撤回。'
          },
          {
            question: '7、中獎之後領獎的步驟是什麼樣的？',
            answer: '答：所有獲中彩票，必須於有關攪珠的日期後起計60天內領取 (例子：於3月1日所舉行的攪珠的獲中彩票，可於3月1日當天至4月30日內任何一天領取)。逾期未兌獎視為棄獎，棄獎獎金納入彩票公益金。'
          },
          {
            question: '8、如果我的彩券受到污染或損壞是否可以兌獎？',
            answer: '答：根據《奖券规例》規定任何獎券彩票（包括損毀彩票）不會獲得派發獎金或發還退款，除非該彩票可憑其獨有的序列號碼辨證。'
          },]
      };
    }
  }
</script>

<style lang="css" scoped>
  /deep/ .FAQ-content .el-collapse-item__header,
  /deep/ .FAQ-content .el-collapse-item__wrap {
    padding: 0 .3rem;
    font-size: .4rem;
  }

  /deep/ .FAQ-content .el-collapse-item__content {
    font-size: .35rem;
  }

  .FAQ-title {
    color: #eb5e04;
  }
</style>
