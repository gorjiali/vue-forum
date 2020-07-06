<template>
  <div class="col-full">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import sourceData from "@/data";
import CategoryList from "@/components/CategoryList";
console.log(sourceData);

export default {
  data() {
    return {
      categories: Object.values(sourceData.categories)
    };
  },

  components: { CategoryList }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
