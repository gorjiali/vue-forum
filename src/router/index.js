import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import ThreadShow from '@/views/ThreadShow.vue';
import ForumShow from '@/views/ForumShow.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/forum/:id',
    name: 'ForumShow',
    component: ForumShow,
    props: true,
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
