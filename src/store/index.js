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
      post.userId = context.state.authId;
      post.publishedAt = Math.floor(Date.now()) / 1000;

      context.commit('setPost', { post, postId });
      context.commit('appendPostToThread', { post, postId });
      context.commit('appendPostToUser', { post, postId });
      return Promise.resolve(postId);
    },

    updatePost(context, { text, postId }) {
      return new Promise((resolve, reject) => {
        let post = context.state.posts[postId];

        context.commit('setPost', {
          post: {
            ...post,
            edited: {
              at: Math.floor(Date.now()) / 1000,
              by: context.state.authUser,
            },
            text,
          },
          postId,
        });

        resolve({ ...post, text });
      });
    },

    addThread(context, { title, text, forumId }) {
      return new Promise((resolve, reject) => {
        const threadId = `newThread ${Math.random()}`;
        const userId = context.state.authId;
        const publishedAt = Math.floor(Date.now()) / 1000;
        let thread = { title, text, forumId, '.key': threadId, userId, publishedAt };

        context.commit('setThread', { thread, threadId });

        context.commit('appendThreadToForum', { forumId, threadId });
        context.commit('appendThreadToUser', { userId, threadId });

        context.dispatch('addPost', { text, threadId }).then((postId) => {
          context.commit('setThread', { thread: { ...thread, firstPostId: postId }, threadId });
        });
        resolve(context.state.threads[threadId]);
      });
    },

    updateThread(context, { title, text, threadId }) {
      return new Promise((resolve, reject) => {
        let thread = context.state.threads[threadId];

        context.commit('setThread', { thread: { ...thread, title }, threadId });

        context.dispatch('updatePost', { text, postId: thread.firstPostId }).then(() => {
          resolve({ ...thread, title });
        })
      });
    },

    updateUser(context, user) {
      context.commit('setUser', { user, userId: user['.key'] });
    },
  },

  mutations: {
    setUser(state, { thread, threadId }) {
      Vue.set(state.threads, threadId, thread);
    },

    setUser(state, { user, userId }) {
      Vue.set(state.users, userId, user);
    },

    setPost(state, { post, postId }) {
      Vue.set(state.posts, postId, post);
    },

    setThread(state, { thread, threadId }) {
      Vue.set(state.threads, threadId, thread);
    },

    appendThreadToUser(state, { threadId, userId }) {
      const user = state.users[userId];
      if (!user.threads) Vue.set(user, 'threads', {});
      Vue.set(user.threads, threadId, threadId);
    },

    appendThreadToForum(state, { forumId, threadId }) {
      const forum = state.forums[forumId];
      if (!forum.threads) Vue.set(forum, 'threads', {});
      Vue.set(forum.threads, threadId, threadId);
    },

    appendPostToThread(state, { post, postId }) {
      const thread = state.threads[post.threadId];
      if (!thread.posts) Vue.set(thread, 'posts', {});
      Vue.set(thread.posts, postId, postId);
    },

    appendPostToUser(state, { post, postId }) {
      const user = state.users[post.userId];
      if (!user.posts) Vue.set(user, 'posts', {});
      Vue.set(user.posts, postId, postId);
    },
  },
});
