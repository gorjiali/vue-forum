<template>
  <div>
    <CategoryListItem v-for="category in categories" :category="category" :key="category['.key']" />
  </div>
</template>

<script>
import CategoryListItem from "./CategoryListItem";
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },

  components: {
    CategoryListItem
  }
};
</script>

<style>
</style>