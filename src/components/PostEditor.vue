<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <textarea v-model="text" cols="130" rows="10" class="form-input"></textarea>
    </div>
    <div class="form-actions">
      <button @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn-blue">{{ isUpdate ? 'Update' : 'Submit post' }}</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    threadId: {
      required: false,
      type: String
    },

    post: {
      type: Object
    }
  },

  data() {
    return {
      text: this.post ? this.post.text : ""
    };
  },

  computed: {
    isUpdate() {
      return this.post ? true : false;
    }
  },

  methods: {
    save() {
      this.persist().then(post => {
        this.$emit("save");
      });
    },

    persist() {
      return this.isUpdate ? this.update() : this.create();
    },

    create() {
      const post = {
        text: this.text,
        threadId: this.threadId
      };
      this.text = "";
      return this.$store.dispatch("addPost", post);
    },

    update() {
      const post = {
        text: this.text,
        postId: this.post[".key"]
      };
      return this.$store.dispatch("updatePost", post);
      this.text = "";
    },

    cancel() {
      this.$emit('cancel')
    }
  }
};
</script>

<style>
</style>