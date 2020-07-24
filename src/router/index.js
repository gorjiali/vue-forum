import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '@/views/PageHome.vue';
import ThreadShow from '@/views/PageThreadShow.vue';
import ThreadCreate from '@/views/PageThreadCreate.vue';
import ThreadEdit from '@/views/PageThreadEdit.vue';
import ForumShow from '@/views/PageForumShow.vue';
import CategoryShow from '@/views/PageCategoryShow.vue';
import NotFound from '@/views/PageNotFound.vue';
import Profile from '@/views/PageProfile.vue';
import Register from '@/views/PageRegister.vue';
import SignIn from '@/views/PageSignIn.vue';

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
    meta: { requiresGuest: true },
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresGuest: true },
  },
  // EDU: component-less route
  {
    path: '/signOut',
    name: 'SignOut',
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      store.dispatch('signOut')
        .then(router.push({ name: 'Home' }))
    }
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true },
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true },
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true,
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  store.dispatch('initAuthentication').then(user => {
    if (to.matched.some(item => item.meta.requiresAuth)) {
      if (user) {
        next();
      } else {
        next({ name: 'SignIn', query: { redirectTo: to.path } });
      }
    } else if (to.matched.some(item => item.meta.requiresGuest)) {
      if (!user) {
        next();
      } else {
        next({ name: 'Home' });
      }
    } else {
      next()
    }
  })
})

export default router;
