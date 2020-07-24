import { countObjectProperties } from '@/utils';

export default {
    authUser(state) {
        return state.authId ? state.users[state.authId] : null;
    },

    userPosts: state => id => {
        const user = state.users[id]
        if (user.posts) {
            return Object.values(state.posts).filter(post => post.userId === id)
        } else {
            return []
        }
    },

    userPostsCount: (state) => (id) => countObjectProperties(state.users[id].posts), //EDU getters with higher order functions

    userThreadsCount: (state) => (id) => countObjectProperties(state.users[id].threads),

    threadRepliesCount: (state) => (id) => countObjectProperties(state.threads[id].posts) - 1,
}