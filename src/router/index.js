import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import ThreadShow from '@/views/ThreadShow.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
