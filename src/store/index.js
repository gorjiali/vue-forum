import Vue from 'vue';
import Vuex from 'vuex';
import { database } from 'firebase';
import { countObjectProperties } from '@/utils';

Vue.use(Vuex);

// EDU mutation with higher order functions
const makeAppendParentToChildMutation = ({ child, parent }) => (state, { childId, parentId }) => {
  const resource = state[parent][parentId];
  if (!resource[child]) Vue.set(resource, child, {});
  Vue.set(resource[child], childId, childId);
};

export default new Vuex.Store({
  state: {
    categories: {},
    forums: {},
    users: {},
    threads: {},
    posts: {},
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },

  getters: {
    authUser(state) {
      // return state.users[state.authId];
      return {};
    },

    userPostsCount: (state) => (id) => countObjectProperties(state.users[id].posts), //EDU getters with higher order functions

    userThreadsCount: (state) => (id) => countObjectProperties(state.users[id].threads),

    threadRepliesCount: (state) => (id) => countObjectProperties(state.threads[id].posts) - 1,
  },

  actions: {
    addPost(context, post) {
      const postId = `newPost ${Math.random()}`;
      post['.key'] = postId;
      post.userId = context.state.authId;
      post.publishedAt = Math.floor(Date.now()) / 1000;

      context.commit('setPost', { post, postId });
      context.commit('appendPostToThread', { parentId: post.threadId, childId: postId });
      context.commit('appendPostToUser', { parentId: post.userId, childId: postId });
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

        context.commit('appendThreadToForum', { parentId: forumId, childId: threadId });
        context.commit('appendThreadToUser', { parentId: userId, childId: threadId });

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
        });
      });
    },

    updateUser(context, user) {
      context.commit('setUser', { user, userId: user['.key'] });
    },

    fetchItem({ commit, state }, { id, resource }) {
      return new Promise((resolve, reject) => {
        database().ref(resource).child(id).once('value', (snapshot) => {
          commit('setItem', {
            id: snapshot.key, item: { ...snapshot.val(), '.key': snapshot.key }, resource
          });
          resolve(state[resource][id]);
        });
      });
    },

    fetchAllCategories({ commit, state }) {
      return new Promise((resolve, reject) => {
        database().ref('categories').once('value', (snapshot) => {
          const allCategories = snapshot.val();
          Object.keys(allCategories).forEach(categoryId => {
            commit('setItem', {
              id: categoryId, item: { ...allCategories[categoryId], '.key': categoryId }, resource: 'categories'
            });
          });
          resolve(state.categories);
        });
      });
    },

    fetchItems({ dispatch }, { ids, resource }) {
      ids = Array.isArray(ids) ? ids : Object.keys(ids);
      return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource })))
    },

    fetchForums({ dispatch }, { ids }) {
      return dispatch('fetchItems', { ids, resource: 'forums' })
    },

    fetchThreads({ dispatch }, { ids }) {
      return dispatch('fetchItems', { ids, resource: 'threads' })
    },

    fetchUsers({ dispatch }, { ids }) {
      return dispatch('fetchItems', { ids, resource: 'users' })
    },

    fetchPosts({ dispatch }, { ids }) {
      return dispatch('fetchItems', { ids, resource: 'posts' })
    },

    fetchCategory({ dispatch }, { id }) {
      return dispatch('fetchItem', { id, resource: 'categories' })
    },

    fetchForum({ dispatch }, { id }) {
      return dispatch('fetchItem', { id, resource: 'forums' })
    },

    fetchThread({ dispatch }, { id }) {
      return dispatch('fetchItem', { id, resource: 'threads' })
    },

    fetchUser({ dispatch }, { id }) {
      return dispatch('fetchItem', { id, resource: 'users' })
    },

    fetchPost({ dispatch }, { id }) {
      return dispatch('fetchItem', { id, resource: 'posts' })
    },
  },

  mutations: {
    setItem(state, { resource, item, id }) {
      Vue.set(state[resource], id, item)
    },

    appendThreadToUser: makeAppendParentToChildMutation({ parent: 'users', child: 'threads' }),

    appendThreadToForum: makeAppendParentToChildMutation({ parent: 'forums', child: 'threads' }),

    appendPostToThread: makeAppendParentToChildMutation({ parent: 'threads', child: 'posts' }),

    appendPostToUser: makeAppendParentToChildMutation({ parent: 'users', child: 'posts' }),
  },
});
