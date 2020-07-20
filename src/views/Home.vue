<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import CategoryList from "@/components/CategoryList";
import { mapActions } from 'vuex';

export default {
  computed: {
    categories() {
      return Object.values(this.$store.state.categories);
    }
  },

  components: { CategoryList },

  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },

  //EDU: lifecycle hook, beforeCreate: in beforeCreated we can't access or update data
  beforeCreated() { },

  //EDU: lifecycle hook, create: triggers before rendering template in DOM, so it is a great time to fire an AJAX call
  created() {
    this.fetchAllCategories().then(categories => {
      Object.values(categories).forEach(category =>
        this.fetchForums({ ids: category.forums })
      )
    })
  },

  //EDU: lifecycle hook, beforeMount
  beforeMount() { },

  //EDU: lifecycle hook, mounted: like ready function on jquery and in this hook we access to $el property
  mounted() { },

  //EDU: lifecycle hook, beforeDestroy: in before destroy the component is fully functional, best place to turn off listeners
  beforeDestroy() { },

  //EDU: lifecycle hook, destroyed: in destroyed we don't access to $el property and best place for informing a 3rd party that the component is destroyed
  destroyed() { }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
