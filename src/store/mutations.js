import Vue from 'vue';

// EDU mutation with higher order functions
const makeAppendParentToChildMutation = ({ child, parent }) => (state, { childId, parentId }) => {
    const resource = state[parent][parentId];
    if (!resource[child]) Vue.set(resource, child, {});
    Vue.set(resource[child], childId, childId);
};

export default {
    setItem(state, { resource, item, id }) {
        item['.key'] = id
        Vue.set(state[resource], id, item)
    },

    appendThreadToUser: makeAppendParentToChildMutation({ parent: 'users', child: 'threads' }),

    appendThreadToForum: makeAppendParentToChildMutation({ parent: 'forums', child: 'threads' }),

    appendPostToThread: makeAppendParentToChildMutation({ parent: 'threads', child: 'posts' }),

    appendContributorToThread: makeAppendParentToChildMutation({ parent: 'threads', child: 'contributors' }),

    appendPostToUser: makeAppendParentToChildMutation({ parent: 'users', child: 'posts' }),
}