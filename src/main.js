import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AppDate from '@/components/AppDate';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// Global base components
Vue.component('AppDate', AppDate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
