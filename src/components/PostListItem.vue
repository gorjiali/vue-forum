<template>
  <div v-if="post && user" class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{ user.name }}</a>

      <a href="#">
        <img class="avatar-large" :src="user.avatar" alt="user avatar" />
      </a>

      <p class="desktop-only text-small">{{ userPostsCount }} posts</p>
      <p class="desktop-only text-small">{{ userThreadsCount }} threads</p>
    </div>

    <div class="post-content">
      <template v-if="!editing">
        <div>{{ post.text }}</div>
        <a
          v-if="authUser"
          @click.prevent="editing = true"
          style="margin-left: auto;"
          class="link-unstyled"
          title="Make a change"
        >
          <i class="fas fa-pencil-alt"></i>
        </a>
      </template>
      <div v-else>
        <PostEditor :post="post" @save="editing = false" @cancel="editing = false" />
      </div>
    </div>

    <div v-if="post.edited" class="post-date text-faded">edited</div>

    <div class="post-date text-faded">
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script>
import PostEditor from "./PostEditor";
import { mapGetters } from 'vuex'

export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      editing: false
    };
  },

  components: {
    PostEditor
  },

  computed: {
    ...mapGetters(['authUser']),

    user() {
      return this.$store.state.users[this.post.userId];
    },

    userPostsCount() {
      return this.$store.getters.userPostsCount(this.post.userId);
    },

    userThreadsCount() {
      return this.$store.getters.userThreadsCount(this.post.userId);
    }
  }
};
</script>

<style>
</style>