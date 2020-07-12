<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <textarea v-model="text" cols="30" rows="10" class="form-input"></textarea>
    </div>
    <div class="form-actions">
      <button class="btn-blue">Submit post</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    threadId: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      text: ""
    };
  },

  methods: {
    save() {
      const post = {
        text: this.text,
        threadId: this.threadId
      };

      this.$store.dispatch("addPost", post);

      this.text = "";
    }
  }
};
</script>

<style>
</style>