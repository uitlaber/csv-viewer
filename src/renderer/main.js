import Vue from 'vue'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Papa from 'papaparse'

import App from './App'
import router from './router'
import store from './store'

import VueMoment from 'vue-moment'
import moment from 'moment'

Vue.use(VueMoment, { moment })

Vue.prototype.$papa = Papa

Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
