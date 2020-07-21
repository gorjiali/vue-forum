<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Thread Editing</h1>

    <ThreadEditor :title="thread.title" :text="text" @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from "@/components/ThreadEditor";
import { mapActions } from 'vuex';
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  mixins: [asyncDataStatus],

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
    thread() {
      return this.$store.state.threads[this.id];
    },

    text() {
      const post = this.$store.state.posts[this.thread.firstPostId];
      return post ? post.text : null;
    }
  },

  methods: {
    ...mapActions(['updateThread']),

    save({ title, text }) {
      this.updateThread({ title, text, threadId: this.id })
        .then(thread => this.$router.push({ name: "ThreadShow", params: { id: thread[".key"] } }));
    },

    cancel() {
      this.$router.push({
        name: "threadShow",
        params: { id: this.id }
      });
    }
  },

  created() {
    this.$store.dispatch('fetchThread', { id: this.id }).then(thread => {
      this.$store.dispatch('fetchPost', { id: thread.firstPostId })
        .then(() => this.asyncDataStatus_fetched())
    })
  }
};
</script>

<style>
</style>