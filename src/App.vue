<template>
  <div id="app">
    <TheNavbar />
    <div class="container">
      <!-- EDU ideal way to show loading indicator -->
      <AppSpinner v-show="!showPage" />
      <router-view v-show="showPage" @ready="showPage = true" />
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import AppSpinner from "@/components/AppSpinner"

export default {
  data() {
    return {
      showPage: false
    }
  },

  components: {
    TheNavbar,
    AppSpinner
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
