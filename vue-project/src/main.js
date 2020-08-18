import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.scss'

const baseURL = window.baseUrl
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.prototype.$baseURL=baseURL.baseUrl

Vue.use(ElementUI, { size: 'small' })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
