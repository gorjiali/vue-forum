<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in
      <i>{{forum.name}}</i>
    </h1>

    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from "@/components/ThreadEditor";

export default {
  props: {
    forumId: {
      type: String,
      required: true
    }
  },

  components: {
    ThreadEditor
  },

  computed: {
    forum() {
      return this.$store.state.forums[this.forumId];
    }
  },

  methods: {
    save({ title, text }) {
      this.$store
        .dispatch("addThread", { title, text, forumId: this.forum[".key"] })
        .then(thread =>
          this.$router.push({
            name: "ThreadShow",
            params: { id: thread[".key"] }
          })
        );
    },

    cancel() {
      this.$router.push({
        name: "ForumShow",
        params: { id: this.forum[".key"] }
      });
    }
  }
};
</script>

<style>
</style>