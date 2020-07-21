import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/PageHome.vue';
import ThreadShow from '@/views/PageThreadShow.vue';
import ThreadCreate from '@/views/PageThreadCreate.vue';
import ThreadEdit from '@/views/PageThreadEdit.vue';
import ForumShow from '@/views/PageForumShow.vue';
import CategoryShow from '@/views/PageCategoryShow.vue';
import NotFound from '@/views/PageNotFound.vue';
import Profile from '@/views/PageProfile.vue';
import Register from '@/views/PageRegister.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
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
    path: '/thread/create/:forumId',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true,
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
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
