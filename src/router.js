import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: 'canvas',
        name: 'canvas',
        component: () => import('./views/Canvas/commandTest.vue')
      }]
    },{
      path: '/',
      redirect: '/home/canvas',
    }
  ]
})
