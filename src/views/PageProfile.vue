<template>
  <div class="flex-grid">
    <UserProfileCard v-if="!edit" :user="user" />
    <UserProfileCardEditor v-else :user="user" />

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">{{ user.username }}'s recent activity</span>
        <a href="#">See only started threads?</a>
      </div>

      <hr />
      <PostList :posts="posts" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostList from "@/components/PostList";
import UserProfileCard from "@/components/UserProfileCard";
import UserProfileCardEditor from "@/components/UserProfileCardEditor";

export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },

  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },

  computed: {
    ...mapGetters({
      user: "authUser"
    }),

    posts() {
      return this.$store.getters.userPosts(this.user['.key'])
    }
  },

  created() {
    this.$store.dispatch('fetchPosts', { ids: this.user.posts })
      .then(() => this.$emit('ready'))
  }
};
</script>

<style>
</style>