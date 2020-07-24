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
import { mapActions } from 'vuex';
export default {
  props: { 
    threadId: {
      required: false,
      type: String
    },

    post: {
      type: Object,
      validator: value => { //EDU custom prop validator
        if (!value.text)
          return console.error(
            'The post prop object must include a "text" attribute.'
          );
        if (!value[".key"])
          return console.error(
            'The post prop object must include a ".key" attribute.'
          );
        return true; //
      }
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
    ...mapActions(['addPost', 'updatePost']),

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
      return this.addPost(post);
    },

    update() {
      const post = {
        text: this.text,
        postId: this.post[".key"]
      };
      return this.updatePost(post);
      this.text = "";
    },

    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style>
</style>