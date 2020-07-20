<template>
  <div id="app">
    <TheNavbar />
    <div class="container">
      <!-- EDU ideal way to show loading indicator -->
      <AppSpinner v-show="!showPage" />
      <router-view v-show="showPage" @ready="readyPage" />
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress';
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
    AppSpinner,
  },

  methods: {
    readyPage() {
      this.showPage = true;
      NProgress.done();
    }
  },

  created() {
    NProgress.configure({
      speed: 500,
      showSpinner: false
    });
    NProgress.start();

    // EDU reset showPage on change page to show loading indicator in every page
    this.$router.beforeEach((to, from, next) => {
      NProgress.start();
      this.showPage = false;
      next();
    })
  }

};
</script>

<style>
@import "assets/css/style.css";
@import "~nprogress/nprogress.css";

#progress .bar {
  background: #57ad8d;
}
</style>
