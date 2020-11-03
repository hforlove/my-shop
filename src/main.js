import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* flexible */
import 'amfe-flexible/index.js'

/* vant start */
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
/* vant end */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
