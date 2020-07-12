import Vue from 'vue';
import Vuex from 'vuex';
import sourceData from '@/data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },

  getters: {
    authUser(state) {
      return state.users[state.authId];
    },
  },

  actions: {
    addPost(context, post) {
      const postId = `newPost ${Math.random()}`;
      post['.key'] = postId;
      post.userId = context.state.authId
      post.publishedAt = Math.floor(Date.now()) / 1000;
     
      context.commit('setPost', { post, postId });
      context.commit('appendPostToThread', { post, postId });
      context.commit('appendPostToUser', { post, postId });
    },

    updateUser(context, user) {
      context.commit('setUser', { user, userId: user['.key'] });
    },
  },

  mutations: {
    setUser(state, { user, userId }) {
      Vue.set(state.users, userId, user);
    },

    setPost(state, { post, postId }) {
      Vue.set(state.posts, postId, post);
    },

    appendPostToThread(state, { post, postId }) {
      const thread = state.threads[post.threadId];
      Vue.set(thread.posts, postId, postId);
    },

    appendPostToUser(state, { post, postId }) {
      Vue.set(state.users[post.userId].posts, postId, postId);
    },
  },
});
