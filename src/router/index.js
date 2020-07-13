import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import ThreadShow from '@/views/ThreadShow.vue';
import ThreadCreate from '@/views/ThreadCreate.vue';
import ForumShow from '@/views/ForumShow.vue';
import CategoryShow from '@/views/CategoryShow.vue';
import NotFound from '@/views/NotFound.vue';
import Profile from '@/views/Profile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    props: true,
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true },
  },
  {
    path: '/category/:id',
    name: 'CategoryShow',
    component: CategoryShow,
    props: true,
  },
  {
    path: '/forum/:id',
    name: 'ForumShow',
    component: ForumShow,
    props: true,
  },
  {
    path: '/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
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
