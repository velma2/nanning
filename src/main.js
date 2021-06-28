import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import VueCookie from 'vue-cookie'
import axios from 'axios'
import httpRequest from './utils/httpRequest'
import moment from 'moment'
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.moment = moment
Vue.use(ElementUI)
Vue.use(VueCookie)
// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
// new Vue({
//   render: h => h(App),
// }).$mount('#app')
new Vue({
  router,
  ...App,
}).$mount('#app')