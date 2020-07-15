<template>
  <div class="col-large push-top">
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
      <a href="#" class="link-unstyled">Robin</a>,
      <AppDate :timestamp="thread.publishedAt" />.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >{{ repliesCount }} replies by {{countributorsCount}} contributors</span>
    </p>

    <PostList :posts="posts" />

    <PostEditor :threadId="id" />
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostEditor from "@/components/PostEditor";

export default {
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
    thread() {
      return this.$store.state.threads[this.id];
    },

    repliesCount() {
      return this.$store.getters.threadRepliesCount(this.id);
    },

    countributorsCount() {
      const userIds = Object.keys(this.thread.posts)
        .filter(postId => postId !== this.thread.firstPostId)
        .map(id => this.$store.state.posts[id])
        .map(post => post.userId);

      //EDU remove duplicate array members
      // return userIds.filter((item, index) => userIds.indexOf(item) === index).length;
      return [...new Set(userIds)].length;
    },

    posts() {
      const postIds = Object.values(this.thread.posts);
      return Object.values(this.$store.state.posts).filter(post =>
        postIds.includes(post[".key"])
      );
    }
  }
};
</script>

<style>
</style>