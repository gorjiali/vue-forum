<template>
  <div v-if="category" class="col-full push-top">
    <h1>{{ category.name }}</h1>
    <CategoryListItem :category="category" />
  </div>
</template>

<script>
import CategoryListItem from "@/components/CategoryListItem";


export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    category() {
      return this.$store.state.categories[this.id];
    }
  },

  components: {
    CategoryListItem
  },

  created() {
    this.$store.dispatch('fetchCategory', { id: this.id })
  }
};
</script>


<style>
</style>