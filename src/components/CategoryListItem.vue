<template>
  <div v-if="forums" class="forum-list">
    <h2 class="list-title">
      <router-link :to="{name: 'CategoryShow', params: {id: category['.key']}}">{{ category.name }}</router-link>
    </h2>
    <ForumListItem v-for="forum in forums" :key="forum['.key']" :forum="forum" />
  </div>
</template>

<script>
import ForumListItem from "./ForumListItem";


export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },

  components: {
    ForumListItem
  },

  computed: {
    forums() {
      return Object.values(this.$store.state.forums).filter(
        forum => forum.categoryId === this.category[".key"]
      );
    }
  },

  created() {
    this.$store.dispatch('fetchForums', { ids: this.category.forums })
  }
};
</script>

<style>
</style>