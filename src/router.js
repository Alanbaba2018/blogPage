import Vue from 'vue';
import Router from 'vue-router';
import Session from './views/Session/index.vue';
import Code from './views/Code/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: Session
    }, {
      path: '/code/:codeIndex',
      component: Code
    }
  ]
});
