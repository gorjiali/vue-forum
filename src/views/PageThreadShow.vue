<template>
  <div v-if="asyncDataStatus_ready" class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        class="btn-green btn-small"
        :to="{name: 'ThreadEdit', params: {id}}"
        tag="button"
      >Edit Thread</router-link>
    </h1>

    <p>
      By
      <a href="#" class="link-unstyled">{{ threadCreator.name }}</a>,
      <AppDate :timestamp="thread.publishedAt" />.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >{{ repliesCount }} replies by {{countributorsCount}} contributors</span>
    </p>

    <PostList :posts="posts" />

    <PostEditor v-if="authUser" :threadId="id" />
    <div v-else class="text-center" style="margin-bottom: 50px">
      <router-link :to="{name: 'SignIn', query: {redirectTo: $route.path}}">Signin</router-link>
      or
      <router-link :to="{name: 'Register'}">Register</router-link>
      to post a reply.
    </div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostEditor from "@/components/PostEditor";
import { countObjectProperties } from "@/utils";
import { mapActions, mapGetters } from 'vuex';
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  mixins: [asyncDataStatus],

  props: {
    id: {
      required: true,
      type: String
    }
  },

  components: {
    PostList,
    PostEditor
  },

  computed: {
    ...mapGetters(['authUser']),

    thread() {
      return this.$store.state.threads[this.id];
    },

    threadCreator() {
      return this.$store.state.users[this.thread.userId];
    },

    repliesCount() {
      return this.$store.getters.threadRepliesCount(this.id);
    },

    countributorsCount() {
      // const userIds = Object.keys(this.thread.posts)
      //   .filter(postId => postId !== this.thread.firstPostId)
      //   .map(id => this.$store.state.posts[id])
      //   .map(post => post.userId);

      // //EDU remove duplicate array members
      // // return userIds.filter((item, index) => userIds.indexOf(item) === index).length;
      // return [...new Set(userIds)].length;

      return countObjectProperties(this.thread.contributors);
    },

    posts() {
      const postIds = Object.values(this.thread.posts);
      return Object.values(this.$store.state.posts).filter(post =>
        postIds.includes(post[".key"])
      );
    }
  },

  methods: {
    ...mapActions(['fetchThread', 'fetchUser', 'fetchPost', 'fetchPosts', 'fetchUsers'])
  },

  created() {
    this.fetchThread({ id: this.id }).then(thread => {
      this.fetchUser({ id: thread.userId });
      this.fetchPosts({ ids: Object.keys(thread.posts) }).then(
        posts => this.fetchUsers({ ids: posts.map(post => post.userId) })
      ).then(() => this.asyncDataStatus_fetched())
    });
  }
};
</script>

<style>
</style>