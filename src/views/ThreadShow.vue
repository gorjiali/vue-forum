<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <PostList :posts="posts" />

    <form @submit.prevent="addPost">
      <div class="form-group">
        <textarea v-model="newPostText" cols="30" rows="10" class="form-input"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
  </div>
</template>

<script>
import sourceData from "@/data";
import PostList from "@/components/PostList";

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      thread: sourceData.threads[this.id],
      newPostText: ""
    };
  },

  components: {
    PostList
  },

  computed: {
    posts() {
      const postIds = Object.values(this.thread.posts);
      return Object.values(sourceData.posts).filter(post =>
        postIds.includes(post[".key"])
      );
    }
  },

  methods: {
    addPost() {
      const postId = `newPost ${Math.random()}`;
      const post = {
        text: this.newPostText,
        publishedAt: Math.floor(Date.now()) / 1000,
        userId: "ALXhxjwgY9PinwNGHpfai6OWyDu2",
        threadId: this.id,
        ".key": postId
      };

      // this.$set(obj, propertyName, value)
      this.$set(this.thread.posts, postId, postId);
      this.$set(sourceData.posts, postId, post);
      this.$set(sourceData.users[post.userId].posts, postId, postId);

      this.newPostText = "";
    }
  }
};
</script>

<style>
</style>