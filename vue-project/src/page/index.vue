<template>
  <div>
    <div class="newsContent">
      <carousel></carousel>
    </div>
    <div class="plr-3">
      <div class="flex-row timer-box mtb-3 align-center">
        <span class="text">倒计时：</span>
        <span class="time-text" v-text="hour+'：'"></span>
        <span class="time-text" v-text="minute+'：'"></span>
        <span class="time-text" v-text="second"></span>
      </div>
    </div><!--倒计时模块-->
    <div class="flex-column plr-3">
      <div class="content-title flex-row justify-between align-center">
        <div class="ft_18 title-left c_red">澳门特区</div>
        <div class="ft_18 title-right c_red flex-row align-center">
          <div>第2020028期</div>
          <div class="vertical-line"></div>
          <div class="flex-column">
            <span>下期截止時間: </span>
            <span>2020-08-24 21:15:00</span>
          </div>
        </div>
      </div>
      <ul class="ball-content flex-row center">
        <li class="ball-item flex-column">
          <div class="flex flex-column center">
            <img :src="formatterImg(hmData[0].hm)" class="hm-img" alt="">
            <span class="first-text-t">{{hmData[0].sx}}</span>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img :src="formatterImg(hmData[1].hm)" class="hm-img" alt="">
            <span class="first-text-t">{{hmData[1].sx}}</span>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img :src="formatterImg(hmData[2].hm)" class="hm-img" alt="">
            <span class="first-text-t">{{hmData[2].sx}}</span>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img :src="formatterImg(hmData[3].hm)" class="hm-img" alt="">
            <span class="first-text-t">{{hmData[3].sx}}</span>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img :src="formatterImg(hmData[4].hm)" class="hm-img" alt="">
            <span class="first-text-t">{{hmData[4].sx}}</span>
          </div>
        </li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img :src="formatterImg(hmData[5].hm)" class="hm-img" alt="">
            <span class="first-text-t">{{hmData[5].sx}}</span>
          </div>
        </li>
        <li class="ball-add-item c_red">+</li>
        <li class="ball-item">
          <div class="flex flex-column center">
            <img :src="formatterImg(hmData[6].hm)" class="hm-img" alt="">
            <span class="first-text-t">{{hmData[6].sx}}</span>
          </div>
        </li>
      </ul>

      <el-table
        :data="tableData"
        class="mtb-3 kaijiang-table"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="期號/開獎時間"
          width="120">
          <template slot-scope="scope">
            <div class="flex-column center">
              <span>{{scope.row.name}}</span>
              <span>{{scope.row.time}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          header-align="center"
          label="中獎號碼">
          <template slot-scope="scope">
            <ul class="flex-row center table-lists">
              <template v-for="(item, index) in scope.row.hmData">
                <li v-if="index !== 6 " class="ball-item flex-column">
                  <div class="flex flex-column center">
                    <img :src="formatterImg(item.hm)" class="hm-img" alt="">
                    <span class="first-text-t">{{item.sx}}</span>
                  </div>
                </li>
                <li v-if="index === 6 " class="ball-add-item c_red">+</li>
              </template>
              <li v-if="scope.row.hmData && scope.row.hmData.length >= 7" class="ball-item flex-column">
                <div class="flex flex-column center">
                  <img :src="formatterImg(scope.row.hmData[6].hm)" class="hm-img" alt="">
                  <span class="first-text-t">{{scope.row.hmData[6].sx}}</span>
                </div>
              </li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import carousel from '@/components/carousel'

  const heartCheck = {
    timeout: 60 * 1000,
    timer: null,
    serverTimer: null,
    reset() {
      this.timer && clearTimeout(this.timer)
      this.serverTimer && clearTimeout(this.serverTimer)
    },
    start(ws) {
      this.reset()
      this.timer = setTimeout(() => {
        // console.log('发送心跳,后端收到后，返回一个心跳消息')
        // onmessage拿到返回的心跳就说明连接正常
        ws.send(JSON.stringify({heart: 1}))
        this.serverTimer = setTimeout(() => {
          // 如果超过一定时间还没响应(响应后触发重置)，说明后端断开了
          ws.close()
        }, this.timeout)
      }, this.timeout)
    }
  }
  export default {
    components: {
      carousel
    },
    data() {
      return {
        wsuri: 'wss://132.232.222.50:8901/websocket', // ws wss
        lockReconnect: false, // 连接失败不进行重连
        maxReconnect: 5, // 最大重连次数，若连接失败
        socket: null,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        timeInterval: null,
        hmData: [{"color": "#e11313", "hm": "07", "sx": "马"}, {
          "color": "#1aad19",
          "hm": "06",
          "sx": "羊"
        }, {"color": "#1aad19", "hm": "05", "sx": "猴"}, {
          "color": "#0096ff",
          "hm": "04",
          "sx": "鸡"
        }, {"color": "#0096ff", "hm": "03", "sx": "狗"}, {
          "color": "#e11313",
          "hm": "02",
          "sx": "猪"
        }, {"color": "#e11313", "hm": "01", "sx": "鼠"}],
        tableData: [{
          hmData: [{"color": "#e11313", "hm": "07", "sx": "马"}, {
            "color": "#1aad19",
            "hm": "06",
            "sx": "羊"
          }, {"color": "#1aad19", "hm": "05", "sx": "猴"}, {
            "color": "#0096ff",
            "hm": "04",
            "sx": "鸡"
          }, {"color": "#0096ff", "hm": "03", "sx": "狗"}, {
            "color": "#e11313",
            "hm": "02",
            "sx": "猪"
          }, {"color": "#e11313", "hm": "01", "sx": "鼠"}],
          name: '第2020227期',
          time: '2020-08-23'
        }, {
          hmData: [{"color": "#e11313", "hm": "07", "sx": "马"}, {
            "color": "#1aad19",
            "hm": "06",
            "sx": "羊"
          }, {"color": "#1aad19", "hm": "05", "sx": "猴"}, {
            "color": "#0096ff",
            "hm": "04",
            "sx": "鸡"
          }, {
            "color": "#0096ff",
            "hm": "04",
            "sx": "鸡"
          }, {"color": "#0096ff", "hm": "03", "sx": "狗"},
            {"color": "#e11313", "hm": "01", "sx": "鼠"}],
          name: '第2020227期',
          time: '2020-08-23'
        }, {
          hmData: [{"color": "#e11313", "hm": "07", "sx": "马"}, {
            "color": "#1aad19",
            "hm": "06",
            "sx": "羊"
          }, {"color": "#1aad19", "hm": "05", "sx": "猴"}, {
            "color": "#0096ff",
            "hm": "04",
            "sx": "鸡"
          }, {"color": "#0096ff", "hm": "03", "sx": "狗"}, {
            "color": "#e11313",
            "hm": "02",
            "sx": "猪"
          }, {"color": "#e11313", "hm": "07", "sx": "马"}],
          name: '第2020227期',
          time: '2020-08-23'
        }]
      }
    },
    mounted() {
      // this.initWebSocket();
      this.setTimer(12000)
    },
    methods: {
      formatterImg(hm) {
        return require(`./../assets/images/${hm}.png`)
      },
      setTimer(intDiff) {
        let self = this;
        window.clearInterval(self.timeInterval);
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
        }, 1000);
      },
      reconnect() {
        console.log('尝试重连')
        if (this.lockReconnect || this.maxReconnect <= 0) {
          return
        }
        setTimeout(() => {
          // this.maxReconnect-- // 不做限制 连不上一直重连
          this.initWebSocket()
        }, 60 * 1000)
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
          this.socket.onopen = this.websocketOnOpen
          // 监听socket错误信息
          this.socket.onerror = this.websocketOnError
          // 监听socket消息
          this.socket.onmessage = this.websocketOnMessage
          // 监听socket关闭
          this.socket.onclose = this.websocketClose
        } catch (e) {
          this.reconnect()
        }
      },
      websocketOnOpen() {
        console.log('WebSocket连接成功', this.socket.readyState)
        heartCheck.start(this.socket)
        // this.socket.send('发送数据')
        this.websocketSend()
      },
      websocketOnError(e) {
        console.log('WebSocket连接发生错误', e)
        this.reconnect()
      },
      websocketOnMessage(e) {
        // console.log(e)
        let data = JSON.parse(e.data)
        console.log('得到响应', data)
        console.log('可以渲染网页数据...')
        // 消息获取成功，重置心跳
        heartCheck.start(this.socket)
      },
      websocketClose(e) {
        console.log('connection closed (' + e.code + ')')
        this.reconnect()
      },
      websocketSend() {
        let data = {id: 'a1b2c3'}
        this.socket.send(JSON.stringify(data))
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
  }

  .timer-box .time-text {
    min-width: .6rem;
    font-weight: bold;
    font-size: .85rem;
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
