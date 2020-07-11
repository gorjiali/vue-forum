import Vue from 'vue';
import Vuex from 'vuex';
import sourceData from '@/data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: sourceData,

  actions: {
    addPost(context, post) {
      const postId = `newPost ${Math.random()}`;
      post['.key'] = postId;

      context.commit('setPost', { post, postId });
      context.commit('appendPostToThread', { post, postId });
      context.commit('appendPostToUser', { post, postId });
    },
  },

  mutations: {
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
