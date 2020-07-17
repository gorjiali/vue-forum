import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AppDate from '@/components/AppDate';
import firebase from 'firebase';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// Global base components
Vue.component('AppDate', AppDate);

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDHGmztwaGx5U811FGX7PFkbERXTct7pbI',
  authDomain: 'vue-forum-14ffb.firebaseapp.com',
  databaseURL: 'https://vue-forum-14ffb.firebaseio.com',
  projectId: 'vue-forum-14ffb',
  storageBucket: 'vue-forum-14ffb.appspot.com',
  messagingSenderId: '46520651320',
  appId: '1:46520651320:web:16d12cabd68de26ca7a0cd',
  measurementId: 'G-XZHRZBGY22',
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    store.dispatch('fetchUser', { id: store.state.authId });
  },
  render: (h) => h(App),
}).$mount('#app');
