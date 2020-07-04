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
      const postId = `newPost ${Math.random()}`;
      const post = {
        text: this.text,
        publishedAt: Math.floor(Date.now()) / 1000,
        userId: "ALXhxjwgY9PinwNGHpfai6OWyDu2",
        threadId: this.threadId,
        ".key": postId
      };

      this.$emit("save", { post });

      this.text = "";
    }
  }
};
</script>

<style>
</style>