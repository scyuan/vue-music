import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/home'
import mv from '../page/mv'
import topmusic from '../page/topmusic'
import songlist from '../page/songlist'
import play from '../page/play'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/topmusic',
      name: 'topmusic',
      component: topmusic
    },
    {
      path: '/mv',
      name: 'mv',
      component: mv
    },
    {
      path: '/songlist',
      name: 'songlist',
      component: songlist
    }
  ]
})
