import { countObjectProperties } from '@/utils';

export default {
    authUser(state) {
        return state.users[state.authId];
    },

    userPostsCount: (state) => (id) => countObjectProperties(state.users[id].posts), //EDU getters with higher order functions

    userThreadsCount: (state) => (id) => countObjectProperties(state.users[id].threads),

    threadRepliesCount: (state) => (id) => countObjectProperties(state.threads[id].posts) - 1,
}