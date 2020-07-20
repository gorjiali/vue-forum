<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <p class="text-center">
        <img :src="user.avatar" alt class="avatar-xlarge img-update" />
      </p>

      <div class="form-group">
        <input
          v-model="activeUser.username"
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
        />
      </div>

      <input
        v-model="activeUser.name"
        type="text"
        placeholder="Full Name"
        class="form-input text-lead"
      />
      <div class="form-group"></div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          v-model="activeUser.bio"
          class="form-input"
          id="user_bio"
          placeholder="Write a few words about yourself."
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ userPostsCount }} posts</span>
        <span>{{ userThreadsCount }} threads</span>
      </div>

      <hr />

      <div class="form-group">
        <input autocomplete="off" v-model="activeUser.website" class="form-input" id="user_website" />
        <label class="form-label" for="user_website">Website</label>
      </div>

      <div class="form-group">
        <input autocomplete="off" class="form-input" v-model="activeUser.email" id="user_email" />
        <label class="form-label" for="user_email">Email</label>
      </div>

      <div class="form-group">
        <input
          autocomplete="off"
          class="form-input"
          id="user_location"
          v-model="activeUser.location"
        />
        <label class="form-label" for="user_location">Location</label>
      </div>

      <div class="btn-group space-between">
        <button @click.prevent="cancel" class="btn-ghost">Cancel</button>
        <button @click.prevent="save" type="submit" class="btn-blue">Save</button>
      </div>
    </div>

    <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      activeUser: { ...this.user }
    };
  },

  computed: {
    userPostsCount() {
      return this.$store.getters.userPostsCount(this.user[".key"]);
    },

    userThreadsCount() {
      return this.$store.getters.userThreadsCount(this.user[".key"]);
    }
  },

  methods: {
    ...mapActions(['updateUser']),

    save() {
      this.updateUser({ ...this.activeUser });
      this.$router.push({ name: "Profile" });
    },

    cancel() {
      this.$router.push({ name: "Profile" });
    }
  }
};
</script>

<style>
</style>