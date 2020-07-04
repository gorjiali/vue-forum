<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{ user.name }}</a>

      <a href="#">
        <img class="avatar-large" :src="user.avatar" alt="user avatar" />
      </a>

      <p class="desktop-only text-small">{{ userPostsCount }} posts</p>
    </div>

    <div class="post-content">
      <div>{{ post.text }}</div>
    </div>

    <div class="post-date text-faded">{{ post.publishedAt }}</div>
  </div>
</template>

<script>
import sourceData from "@/data";

export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },

  computed: {
    user() {
      return sourceData.users[this.post.userId];
    },

    userPostsCount() {
      return Object.values(sourceData.users[this.post.userId].posts).length;
    }
  }
};
</script>

<style>
</style>