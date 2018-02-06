// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../static/swiper/swiper-3.4.2.min.css'
Vue.use(VueAwesomeSwiper)

//axios
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

import Vuex from 'vuex'
Vue.use(Vuex)

import store from './store/index.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
