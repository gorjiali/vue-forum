import { database, auth } from 'firebase';
import { removeEmptyProperties } from '@/utils'

export default {
    addUser({ commit, state }, { id, name, username, email, password, avatar = null }) {
        return new Promise((resolve, reject) => {
            const registeredAt = Math.floor(Date.now()) / 1000;
            const usernameLower = username.toLowerCase();
            const user = { name, username, email, password, avatar, registeredAt, usernameLower }
            console.log(user)
            database().ref('users').child(`${id}`).set(user)
                .then(() => {
                    commit('setItem', { resource: 'users', item: user, id: id });
                    resolve(state.users[id])
                })
        })
    },

    initAuthentication({ dispatch, commit, state }) {
        return new Promise((resolve, reject) => {
            if (state.unsubscribeAuthObserver) {
                state.unsubscribeAuthObserver()
            }
            const unsubscribe = auth().onAuthStateChanged(user => {
                if (user) {
                    dispatch('fetchAuthUser')
                        .then(() => resolve(user))
                } else {
                    resolve(null)
                }
            })
            commit('setUnsubscribeAuthObserver', unsubscribe)
        })
    },

    registerUserWithEmailAndPassword({ dispatch }, { name, username, email, password, avatar = null }) {
        return auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                return dispatch('addUser', { id: user.user.uid, name, username, email, password, avatar })
            })
    },

    signInWithEmailAndPassword({ commit }, { email, password }) {
        return auth().signInWithEmailAndPassword(email, password)
    },

    signOut({ commit }) {
        return auth().signOut()
            .then(() => commit('setAuthId', null));
    },

    fetchAuthUser({ commit, dispatch }) {
        const authId = auth().currentUser.uid;
        return dispatch('fetchUser', { id: authId })
            .then(() => commit('setAuthId', authId))
    },

    addPost({ commit, state }, post) {
        const postId = database().ref('posts').push().key;
        post.userId = state.authId;
        post.publishedAt = Math.floor(Date.now()) / 1000;
        let updates = {};
        updates[`posts/${postId}`] = post;
        updates[`threads/${post.threadId}/posts/${postId}`] = postId;
        updates[`users/${post.userId}/posts/${postId}`] = postId;

        database().ref().update(updates).then(() => {
            commit('setItem', { resource: 'posts', item: post, id: postId });
            commit('appendPostToThread', { parentId: post.threadId, childId: postId });
            commit('appendContributorToThread', { parentId: post.threadId, childId: post.userId });
            commit('appendPostToUser', { parentId: post.userId, childId: postId });
            return Promise.resolve(postId);
        })
    },

    updatePost({ commit, state }, { text, postId }) {
        return new Promise((resolve, reject) => {
            let post = state.posts[postId];
            const edited = { at: Math.floor(Date.now()) / 1000, by: state.authId };
            const updates = { text, edited };

            database().ref('posts').child(postId).update(updates).then(() => {
                commit('setItem', { resource: 'posts', item: { ...post, edited, text }, id: postId });
                resolve(state.posts[postId]);
            })
        });
    },

    addThread({ state, commit, dispatch }, { title, text, forumId }) {
        return new Promise((resolve, reject) => {
            const threadId = database().ref('threads').push().key;
            const postId = database().ref('posts').push().key;
            const userId = state.authId;
            const publishedAt = Math.floor(Date.now()) / 1000;
            const thread = { title, text, forumId, userId, publishedAt, posts: {} };
            thread.posts[postId] = postId;
            const post = { text, publishedAt, userId, threadId }

            let updates = {};
            updates[`threads/${threadId}`] = thread;
            updates[`forums/${forumId}/threads/${threadId}`] = threadId
            updates[`users/${userId}/threads/${threadId}`] = threadId
            updates[`posts/${postId}`] = post;
            updates[`users/${userId}/posts/${postId}`] = postId;

            database().ref().update(updates).then(() => {
                commit('setItem', { resource: 'threads', item: thread, id: threadId });
                commit('appendThreadToForum', { parentId: forumId, childId: threadId });
                commit('appendThreadToUser', { parentId: userId, childId: threadId });
                commit('setItem', { resource: 'posts', item: post, id: postId });
                commit('appendPostToThread', { parentId: post.threadId, childId: postId });
                commit('appendPostToUser', { parentId: post.userId, childId: postId });
                resolve(state.threads[threadId]);
            })


        });
    },

    updateThread({ state, commit }, { title, text, threadId }) {
        return new Promise((resolve, reject) => {
            let thread = state.threads[threadId];
            let post = state.posts[thread.firstPostId];
            const edited = { at: Math.floor(Date.now()) / 1000, by: state.authId };

            let updates = {}
            updates[`posts/${thread.firstPostId}/text`] = text;
            updates[`posts/${thread.firstPostId}/edited`] = edited;
            updates[`threads/${threadId}/title`] = title;

            database().ref().update(updates).then(() => {
                commit('setItem', { resource: 'threads', item: { ...thread, title }, id: threadId });
                commit('setItem', { resource: 'posts', item: { ...post, text }, id: thread.firstPostId });
                resolve(state.threads[threadId]);
            })
        });
    },

    updateUser({ commit, state }, user) {
        const updates = {
            avatar: user.avatar,
            name: user.name,
            username: user.username,
            bio: user.bio,
            location: user.location,
            website: user.website,
            email: user.email,
        };
        return new Promise((resolve, reject) => {
            database().ref('users').child(user['.key']).update(removeEmptyProperties(updates))
                .then(() => {
                    commit('setItem', {resource: 'users', item: user, id: user['.key'] });
                    resolve(state.users[user['.key']]);
                })
        })
    },

    fetchItem({ commit, state }, { id, resource }) {
        return new Promise((resolve, reject) => {
            database().ref(resource).child(id).once('value', (snapshot) => {
                commit('setItem', { id: snapshot.key, item: snapshot.val(), resource });
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
                        id: categoryId, item: allCategories[categoryId], resource: 'categories'
                    });
                });
                resolve(state.categories);
            });
        });
    },

    fetchItems({ dispatch }, { ids, resource }) {
        return new Promise((resolve, reject) => {
            ids = Array.isArray(ids) ? ids : Object.keys(ids);
            return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource })))
                .then((items) => resolve(items))
        })
    },

    fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'forums' }),
    fetchThreads: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'threads' }),
    fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'users' }),
    fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'posts' }),

    fetchCategory: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'categories' }),
    fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'forums' }),
    fetchThread: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'threads' }),
    fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'users' }),
    fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'posts' })
}
