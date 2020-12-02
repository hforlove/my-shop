import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as api from './api'

import 'normalize.css/normalize.css'

/* flexible */
import 'amfe-flexible/index.js'

import './assets/css/base.less'

/* vant start */
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
