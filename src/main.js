// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../static/swiper/swiper-3.4.2.min.css'
import 'lib-flexible'
Vue.use(VueAwesomeSwiper)

//axios
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

import Vuex from 'vuex'
Vue.use(Vuex)

import store from './store/index.js'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: 'assets/img/error.jpg',//这个是请求失败后显示的图片
  loading: '../static/img/loading.jpg',//这个是加载的loading过渡效果
  try: 2 // 这个是加载图片数量
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
