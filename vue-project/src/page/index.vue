<template>
  <div>
    <div class="newsContent plr-3">
      <carousel></carousel>
    </div>
    <div class="plr-3 mt-1">
      <div class="flex-row timer-box center">
        <template v-if="hour !== 0">
          <span class="time-text">{{String(hour).slice(0, 1)}}</span>
          <span class="time-text" style="margin-right: 0">{{String(hour).slice(1)}}</span>
        </template>
        <template v-if="hour === 0 || !hour">
          <span class="time-text">0</span>
          <span class="time-text" style="margin-right: 0">0</span>
        </template>
        <div class="time-tips">:</div>
        <template v-if="minute !== 0">
          <span class="time-text">{{String(minute).slice(0, 1)}}</span>
          <span class="time-text" style="margin-right: 0">{{String(minute).slice(1)}}</span>
        </template>
        <template v-if="minute === 0 || !minute">
          <span class="time-text">0</span>
          <span class="time-text" style="margin-right: 0">0</span>
        </template>
        <div class="time-tips">:</div>
        <template v-if="second !== 0">
          <span class="time-text">{{String(second).slice(0, 1)}}</span>
          <span class="time-text">{{String(second).slice(1)}}</span>
        </template>
        <template v-if="second === 0 || !second">
          <span class="time-text">0</span>
          <span class="time-text">0</span>
        </template>
      </div>
    </div>
    <!--倒计时模块-->
    <div class="flex-column plr-3 mt-1">
      <div class="content-title flex-row justify-between align-center">
        <div class="ft_18 title-left c_red">葡京王牌六合彩</div>
        <div class="ft_18 title-right c_red flex-row align-center">
          <div v-if="qs">第{{years}}{{qs}}期</div>
          <div class="vertical-line"></div>
          <div class="flex-column">
            <span>下期开奖時間: </span>
            <span>{{nextkjdate}}</span>
          </div>
        </div>
      </div>
      <div class="kaijian-bg">
        <img v-show="Number(status) === 2" src="./../assets/images/QIU.gif" alt="">
        <img v-show="Number(status) === 1 ||  Number(status) === 0" src="./../assets/images/QIU_static.gif" alt="">
      </div>
      <!--倒计时为0，滚动-->
      <ul v-show="Number(status) === 1" class="ball-content flex-row center">
        <li class="ball-item flex-column">
          <div class="flex flex-column center">
            <img src="./../assets/images/hm2.gif" class="hm-img hm-img-pc" alt="">
            <sheng-xiao class="first-text-t"></sheng-xiao>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img src="./../assets/images/hm4.gif" class="hm-img hm-img-pc" alt="">
            <sheng-xiao class="first-text-t"></sheng-xiao>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img src="./../assets/images/hm3.gif" class="hm-img hm-img-pc" alt="">
            <sheng-xiao class="first-text-t"></sheng-xiao>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img src="./../assets/images/hm4.gif" class="hm-img hm-img-pc" alt="">
            <sheng-xiao class="first-text-t"></sheng-xiao>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img src="./../assets/images/hm5.gif" class="hm-img hm-img-pc" alt="">
            <sheng-xiao class="first-text-t"></sheng-xiao>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img src="./../assets/images/hm6.gif" class="hm-img hm-img-pc" alt="">
            <sheng-xiao class="first-text-t"></sheng-xiao>
          </div>
        </li>
        <li class="ball-add-item c_red">+</li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img src="./../assets/images/hm7.gif" class="hm-img hm-img-pc" alt="">
            <sheng-xiao class="first-text-t"></sheng-xiao>
          </div>
        </li>
      </ul>
      <!--开奖号码+滚动-->
      <ul v-show="Number(status) === 2 || Number(status) === 0" class="ball-content flex-row center">
        <li class="ball-item flex-column">
          <div class="flex flex-column center">
            <template v-if="hmData[0] || Number(status) === 2 || Number(status) === 0">
              <img v-if="hmData[0] && hmData[0].hm" :src="formatterImg(hmData[0].hm)" class="hm-img hm-img-pc" alt="">
              <img v-show="!hmData[0] || !hmData[0].hm" src="./../assets/images/gundong.gif" class="hm-img hm-img-pc" alt="">
              <span v-if="hmData[0] && hmData[0].sx" class="first-text-t">{{hmData[0].sx}}</span>
              <sheng-xiao v-show="!hmData[0] || !hmData[0].sx" class="first-text-t"></sheng-xiao>
            </template>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <template v-if="hmData[1] && hmData[0] && hmData[0].hm">
              <img v-if="hmData[1].hm" :src="formatterImg(hmData[1].hm)" class="hm-img hm-img-pc" alt="">
              <img v-show="!hmData[1].hm" src="./../assets/images/gundong.gif" class="hm-img hm-img-pc" alt="">
              <span v-if="hmData[1].sx" class="first-text-t">{{hmData[1].sx}}</span>
              <sheng-xiao v-show="!hmData[1].sx" class="first-text-t"></sheng-xiao>
            </template>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <template v-if="hmData[2] && hmData[1] && hmData[1].hm">
              <img v-if="hmData[2].hm" :src="formatterImg(hmData[2].hm)" class="hm-img hm-img-pc" alt="">
              <img v-show="!hmData[2].hm" src="./../assets/images/gundong.gif" class="hm-img hm-img-pc" alt="">
              <span v-if="hmData[2].sx" class="first-text-t">{{hmData[2].sx}}</span>
              <sheng-xiao v-show="!hmData[2].sx" class="first-text-t"></sheng-xiao>
            </template>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <template v-if="hmData[3] && hmData[2] && hmData[2].hm">
              <img v-if="hmData[3].hm" :src="formatterImg(hmData[3].hm)" class="hm-img hm-img-pc" alt="">
              <img v-show="!hmData[3].hm" src="./../assets/images/gundong.gif" class="hm-img hm-img-pc" alt="">
              <span v-if="hmData[3].sx" class="first-text-t">{{hmData[3].sx}}</span>
              <sheng-xiao v-show="!hmData[3].sx" class="first-text-t"></sheng-xiao>
            </template>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <template v-if="hmData[4] && hmData[3] && hmData[3].hm">
              <img v-if="hmData[4].hm" :src="formatterImg(hmData[4].hm)" class="hm-img hm-img-pc" alt="">
              <img v-show="!hmData[4].hm" src="./../assets/images/gundong.gif" class="hm-img hm-img-pc" alt="">
              <span v-if="hmData[4].sx" class="first-text-t">{{hmData[4].sx}}</span>
              <sheng-xiao v-show="!hmData[4].sx" class="first-text-t"></sheng-xiao>
            </template>

          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <template v-if="hmData[5] && hmData[4] && hmData[4].hm">
              <img v-if="hmData[5].hm" :src="formatterImg(hmData[5].hm)" class="hm-img hm-img-pc" alt="">
              <img v-show="!hmData[5].hm" src="./../assets/images/gundong.gif" class="hm-img hm-img-pc" alt="">
              <span v-if="hmData[5].sx" class="first-text-t">{{hmData[5].sx}}</span>
              <sheng-xiao v-show="!hmData[5].sx" class="first-text-t"></sheng-xiao>
            </template>
          </div>
        </li>
        <li class="ball-add-item c_red">+</li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <template v-if="hmData[6] && hmData[5] && hmData[5].hm">
              <img v-if="hmData[6].hm" :src="formatterImg(hmData[6].hm)" class="hm-img hm-img-pc" alt="">
              <img v-show="!hmData[6].hm" src="./../assets/images/gundong.gif" class="hm-img hm-img-pc" alt="">
              <span v-if="hmData[6].sx" class="first-text-t">{{hmData[6].sx}}</span>
              <sheng-xiao v-show="!hmData[6].sx" class="first-text-t"></sheng-xiao>
            </template>
          </div>
        </li>
      </ul>

      <el-table
        v-if="tableData && tableData.length > 0"
        :data="tableData"
        class="mt-1 kaijiang-table mb-3"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="期號/開獎時間"
          width="120">
          <template slot-scope="scope">
            <div class="flex-column center">
              <span>第{{scope.row.years}}{{scope.row.qs}}期</span>
              <span>{{scope.row.kjdate}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          header-align="center"
          label="中獎號碼">
          <template slot-scope="scope">
            <ul class="flex-row center table-lists">
              <template v-for="(item, index) in scope.row.hm">
                <li v-if="index !== 6 " class="ball-item flex-column">
                  <div class="flex flex-column center">
                    <img :src="formatterImg(item.hm)" class="hm-img" alt="">
                    <span class="first-text-t">{{item.sx}}</span>
                  </div>
                </li>
                <li v-if="index === 6 " class="ball-add-item c_red">+</li>
              </template>
              <li v-if="scope.row.hm && scope.row.hm.length >= 7" class="ball-item flex-column">
                <div class="flex flex-column center">
                  <img :src="formatterImg(scope.row.hm[6].hm)" class="hm-img" alt="">
                  <span class="first-text-t">{{scope.row.hm[6].sx}}</span>
                </div>
              </li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="total > 0"
        class="my-pagination"
        layout="total, prev, pager, next"
        @current-change="currentChange"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import carousel from '@/components/carousel'
  import ShengXiao from "../components/shengXiao";

  const heartCheck = {
    timeout: 5 * 1000,
    timer: null,
    serverTimer: null,
    reset() {
      this.timer && clearTimeout(this.timer)
      this.serverTimer && clearTimeout(this.serverTimer)
    },
    start(ws) {
      this.reset()
      let count = 0;
      this.timer = setTimeout(() => {
        // console.log('发送心跳,后端收到后，返回一个心跳消息')
        // onmessage拿到返回的心跳就说明连接正常
        // 心跳时间内收不到消息，主动触发连接关闭，开始重连
        if (count < 250) {
          ws.send("HeartBeat");
          count++;
          // console.log('candy--打印:if HeartBeat---start--count', count)
        } else {
          // console.log("else HeartBeat")
          clearInterval(this.timer);
          count = 0;
          // this.serverTimer = setTimeout(() => {
          //
          // }, this.timeout)
          // 如果超过一定时间还没响应(响应后触发重置)，说明后端断开了
          ws.close()
        }
      }, this.timeout)
    }
  }
  export default {
    components: {
      ShengXiao,
      carousel
    },
    data() {
      return {
        wsuri: `${this.wssApi}//websocket`, // ws wss
        lockReconnect: false, // 连接失败不进行重连
        maxReconnect: 250, // 最大重连次数，若连接失败
        reconnectNum: 0, // 重连次数
        socket: null,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        timeInterval: null,
        timerSocketRe: null,
        hmData: [],
        qs: null,
        years: '',
        nextkjdate: null, // 下次开奖时间
        kjstatue: 0, // 是否正在开奖
        status: 0, // 是否开始动图
        currentPage: 1,
        total: 0,
        tableData: []
      }
    },
    mounted() {
      this.initWebSocket();
      this.getDataLists()
      this.setTimer(-12000)
      // this.tableData = [{
      //   years: '2020', qs: '080',
      //   kjdate: '2020-8-09',
      //   hm: [{hm: '02', sx: 'shu'}, {hm: '02', sx: 'shu'}, {hm: '02', sx: 'shu'}, {hm: '02', sx: 'shu'}, {
      //     hm: '02',
      //     sx: 'shu'
      //   }, {
      //     hm: '02',
      //     sx: 'shu'
      //   }, {
      //     hm: '02',
      //     sx: 'shu'
      //   }]
      // }]
    },
    methods: {
      currentChange(currentPage) {
        this.currentPage = currentPage;
        this.getDataLists();
      },
      getDataLists() {
        let self = this
        this.$http.post(`${self.httpApi}/running/historyRecord?limit=10&curPage=${this.currentPage}`)
          .then(res => {
            let _data = res.data && res.data.result;
            if (_data) {
              this.tableData = [];
              this.tableData = _data.records;
              this.total = _data.total;
            }
          })
      },
      formatterImg(hm) {
        return require(`./../assets/images/${hm}.png`)
      },
      setTimer(intDiff) {
        let self = this;
        self.day = 0;
        self.hour = 0;
        self.minute = 0;
        self.second = 0;
        window.clearInterval(self.timeInterval);
        if (intDiff && intDiff > 0) {
          self.timeInterval = window.setInterval(function () {
            if (intDiff > 0) {
              self.day = Math.floor(intDiff / (60 * 60 * 24));
              self.hour = Math.floor(intDiff / (60 * 60)) - (self.day * 24);
              self.minute = Math.floor(intDiff / 60) - (self.day * 24 * 60) - (self.hour * 60);
              self.second = Math.floor(intDiff) - (self.day * 24 * 60 * 60) - (self.hour * 60 * 60) - (self.minute * 60);
            }

            if (self.minute <= 9) self.minute = '0' + self.minute;
            if (self.second <= 9) self.second = '0' + self.second;
            if (self.day > 0) {
              self.hour = self.day * 24 + self.hour;
            } else if (self.hour <= 9) {
              self.hour = '0' + self.hour;
            }
            intDiff--;
            if (intDiff < 0) {
              window.clearInterval(self.timeInterval);
            }
            console.log('candy--打印:intDiff', {intDiff: intDiff, day: this.day, hour: this.hour, minute: this.minute, second: this.second})
          }, 1000);
        }
      },
      reconnect() {
        let self = this

        // console.log('尝试重连')
        if (self.lockReconnect || self.maxReconnect <= 0) {
          return
        }
        self.lockReconnect = true
        if (self.reconnectNum < self.maxReconnect) {
          self.timerSocketRe = setTimeout(() => {
            // this.maxReconnect-- // 不做限制 连不上一直重连
            // console.info(`正在重连第${self.reconnectNum + 1}次`)
            self.initWebSocket();
            self.reconnectNum++;
            self.lockReconnect = false
          }, 5 * 1000)
        } else if (self.reconnectNum >= self.maxReconnect || self.socket.readyState === 1) {
          clearTimeout(self.timerSocketRe);
        }

      },
      initWebSocket() {
        try {
          // 实例话socket
          if ('WebSocket' in window) {
            this.socket = new WebSocket(this.wsuri)
          } else {
            console.log('您的浏览器不支持websocket')
          }
          // 监听socket连接
          this.socket.onopen = this.websocketOnOpen;
          // 监听socket错误信息
          this.socket.onerror = this.websocketOnError;
          // 监听socket消息
          this.socket.onmessage = this.websocketOnMessage;
          // 监听socket关闭
          this.socket.onclose = this.websocketClose;
        } catch (e) {
          this.reconnect();
        }
      },
      websocketOnOpen() {
        heartCheck.start(this.socket);
        this.websocketSend();
      },
      websocketOnError(e) {
        this.reconnect()
      },
      websocketOnMessage(e) {
        // 消息获取成功，重置心跳
        heartCheck.start(this.socket)
        if (e.data === 'service_response_heart') return;
        let data = e.data ? JSON.parse(JSON.stringify(e.data)) : null
        let dataJson = JSON.parse(data)
        this.setTimer(Number(dataJson.nextkjtime));
        this.kjstatue = dataJson.kjstatue;
        this.status = dataJson.status;
        this.nextkjdate = dataJson.nextkjdate;
        this.qs = dataJson.qs;
        this.years = dataJson.years;
        if (data && dataJson.hm) {
          this.hmData = [];
          for (let i = 0; i < 7; i++) {
            if (dataJson.hm[i]) {
              this.hmData.push(dataJson.hm[i])
            } else {
              this.hmData.push({
                color: '',
                hm: '',
                sx: ''
              })
            }
          }
        }
      },
      websocketClose() {
        this.reconnect();
      },
      websocketSend() {
        let data = 'HeartBeat';
        this.socket.send(data);
      }
    },
    destroyed() {
      this.socket.close()
    }
  }
</script>

<style lang="css" scoped>
  .timer-box {
    font-size: .65rem;
    box-shadow: 0 1px 4px #c8c8c8;
    border: 1px solid #dadada;
    padding: .3rem;
    color: #4e4d4d;
  }

  .timer-box .text {
    height: 1rem;
    line-height: 1rem;
  }

  .timer-box .time-tips,
  .timer-box .time-text {
    font-weight: bold;
    font-size: .85rem;
    height: 1rem;
    line-height: 1rem;
    min-width: .6rem;
    text-align: center;
    width: .6rem;
  }

  .timer-box .time-text {
    border: 1px solid #dadada;
    margin-right: .1rem;
  }

  .timer-box .time-tips {
    line-height: .9rem;
  }

  .vertical-line {
    width: 3px;
    height: .8rem;
    background: #d80011;
    margin: 0 .2rem;
  }

  .content-title {
    border: 1px solid #d80011;
    background: #ffc9c9;
    padding: .2rem;
    border-radius: .03rem;
  }

  .ball-content {
    -webkit-box-shadow: 0 1px 4px #c8c8c8;
    box-shadow: 0 1px 4px #c8c8c8;
    border: 1px solid #dadada;
    border-radius: 4px;
    background-color: #fff;
    padding: .3rem 0;
  }

  .kaijiang-table {
    box-shadow: 0 1px 4px #c8c8c8;
    border: 1px solid #dadada;
  }

  .table-lists .ball-item {
    padding: 0 .1rem;
  }

  /deep/ .el-table th>.cell {
    text-align: center;
  }

  /deep/ .my-pagination .el-pager li {
    min-width: .7rem;
  }

  .ball-item {
    width: 14%;
    padding: 0 .2rem;
    box-sizing: border-box;
  }

  .hm-img {
    width: 100%;
    height: 100%;
    max-width: 40px;
    max-height: 40px;
  }

  .ball-content .hm-img-pc {
    max-width: 88px;
    max-height: 88px;
  }

  .ball-add-item {
    width: .8rem;
    text-align: center;
    font-weight: bold;
    font-size: .5rem;
  }

  .ball-item .first-text-t {
    text-align: center;
    font-size: .34rem;
  }
</style>
