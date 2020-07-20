<template>
  <div id="app">
    <TheNavbar />
    <div class="container">
      // EDU ideal way to show loading indicator
      <p v-show="!showPage">Loading ...</p>
      <router-view v-show="showPage" @ready="showPage = true" />
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
export default {
  data() {
    return {
      showPage: false
    }
  },

  components: {
    TheNavbar
  },

  // EDU reset showPage on change page to show loading indicator in every page
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false;
      next();
    })
  }

};
</script>

<style>
@import "assets/css/style.css";
</style>
