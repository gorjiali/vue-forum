<template>
  <div>
    
  </div>
</template>

<script>
import sourceData from "@/data";

export default {
  name: "HelloWorld",

  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
