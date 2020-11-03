import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'

/* flexible */
import 'amfe-flexible/index.js'

/* vant start */
import Vant from 'vant'
import 'vant/lib/index.css'
/* vant end */

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
