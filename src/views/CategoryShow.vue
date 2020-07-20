<template>
  <div v-if="category" class="col-full push-top">
    <h1>{{ category.name }}</h1>
    <CategoryListItem :category="category" />
  </div>
</template>

<script>
import CategoryListItem from "@/components/CategoryListItem";
import { mapActions } from 'vuex';

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

  methods: {
    ...mapActions(['fetchCategory'])
  },

  created() {
    this.fetchCategory({ id: this.id });
  }
};
</script>


<style>
</style>