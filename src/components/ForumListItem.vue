<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        :to="{name: 'ForumShow', params: {id: forum['.key']}}"
        class="text-xlarge"
      >{{ forum.name }}</router-link>
      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p class="count">{{ threadsCount }}</p>
      {{ threadsCount === 1 ? 'thread' : 'threads' }}
    </div>

    <div class="last-thread">
      <!-- <img
        class="avatar"
        src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"
        alt
      />
      <div class="last-thread-details">
        <a href="thread.html">How can I chop onions without...</a>
        <p class="text-xsmall">
          By
          <a href="profile.html">Bruce Wayne</a>, last week
        </p>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forum: {
      type: Object,
      required: true
    }
  },

  computed: {
    threadsCount() {
      return this.forum.threads ? Object.values(this.forum.threads).length : 0;
    }
  }
};
</script>

<style>
</style>