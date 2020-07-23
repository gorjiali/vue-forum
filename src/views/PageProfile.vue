<template>
  <h1>page profile</h1>
  <!-- <div class="flex-grid">
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
  </div> -->
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
      if (this.user.posts) {
        return Object.values(this.$store.state.posts).filter(
          post => post.userId === this.user[".key"]
        );
      }
      return [];
    }
  },

  created() {
    this.$emit('ready')
  }
};
</script>

<style>
</style>