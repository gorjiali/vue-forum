<template>
  <div class="forum-list">
    <h2 class="list-title">
      <a href="#">{{ category.name }}</a>
    </h2>
    <ForumListItem v-for="forum in forums" :key="forum['.key']" :forum="forum" />
  </div>
</template>

<script>
import ForumListItem from "./ForumListItem";
import sourceData from "@/data";

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
      return Object.values(sourceData.forums).filter(
        forum => forum.categoryId === this.category[".key"]
      );
    }
  }
};
</script>

<style>
</style>