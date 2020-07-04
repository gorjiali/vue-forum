<template>
  <div class="col-full" :class="$style.centered">
    <h1 :class="$style.headingLarge">Not Found</h1>
    <p :class="$style.textLarge">Ooops, we couldn't find what you are looking for</p>
    <p :class="$style.textLarge">
      Why don't you
      <router-link :to="{name: 'Home'}">go Home instead?</router-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style module>
.centered {
  text-align: center;
}

.headingLarge {
  font-size: 70px;
}

.textLarge {
  font-size: 40px;
}
</style>