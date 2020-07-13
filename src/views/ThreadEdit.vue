<template>
  <div class="col-full push-top">
    <h1>Thread Editing</h1>

    <ThreadEditor :title="title" :text="text" @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from "@/components/ThreadEditor";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  components: {
    ThreadEditor
  },

  computed: {
    title() {
      return this.$store.state.threads[this.id].title;
    },

    text() {
      return this.$store.state.posts[this.$store.state.threads[this.id].firstPostId].text;
    }
  },

  methods: {
    save({ title, text }) {
      this.$store
        .dispatch("updateThread", { title, text, threadId: this.id })
        .then(thread =>
          this.$router.push({
            name: "ThreadShow",
            params: { id: thread[".key"] }
          })
        );
    },

    cancel() {
      this.$router.push({
        name: "threadShow",
        params: { id: this.id }
      });
    }
  }
};
</script>

<style>
</style>