import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/custom.scss';
import ext from '@/components/index.js';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(ext);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
