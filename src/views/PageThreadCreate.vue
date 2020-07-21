<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Create new thread in
      <i>{{forum.name}}</i>
    </h1>

    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from "@/components/ThreadEditor";
import { mapActions } from 'vuex';
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  mixins: [asyncDataStatus],

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
    ...mapActions(['fetchForum', 'addThread']),

    save({ title, text }) {
      this.addThread({ title, text, forumId: this.forum[".key"] }).then(thread =>
        this.$router.push({ name: "ThreadShow", params: { id: thread[".key"] } })
      );
    },

    cancel() {
      this.$router.push({
        name: "ForumShow",
        params: { id: this.forum[".key"] }
      });
    }
  },

  created() {
    this.fetchForum({ id: this.forumId }).then(() => this.asyncDataStatus_fetched())
  }
};
</script>

<style>
</style>